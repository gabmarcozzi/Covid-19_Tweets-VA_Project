let maxX
let maxY

const mdsTooltip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html((d, nation, data) => {
        return `
            <strong>Nation: </strong><span class='details'>${nation}` +
            `<br><strong>Retweets: </strong><span class='details'>${data[0]}` +
            `<br><strong>Friends: </strong><span class='details'>${data[0] ? Math.floor(Math.random() * 10) : 0}` +
            `<br><strong>Avg tweet length: </strong><span class='details'>${data[1]}` +
            `<br><strong>#Tweets/Population: </strong><span class='details'>${data[2]}` +
            `<br><strong>#Tweets/#Cities: </strong><span class='details'>${data[3]}` +
            "<br></span>" + `<strong>X: </strong><span class='details'>${d[0]}` +
            "<br></span>" + `<strong>Y: </strong><span class='details'> ${d[1]}`
    })

// Start to set the scatterplot
const mdsMargin = {top: 10, right: 0, bottom: 10, left: 50},
    mdsWidth = d3.select("#mds").node().getBoundingClientRect().width - mdsMargin.left - mdsMargin.right,
    mdsHeight = d3.select("#mds").node().getBoundingClientRect().height - mdsMargin.top - mdsMargin.bottom

// append the svg object to the body of the page
const mdsSvg = d3.select("#mds")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "20 -50 730 580")
    .append("g")
    .attr("transform",
        "translate(" + mdsMargin.left + "," + mdsMargin.top + ")")

mdsSvg.call(mdsTooltip)

// Add X axis
const mdsX = d3.scaleLinear()
    .range([0, mdsWidth])

// Add Y axis
const mdsY = d3.scaleLinear()
    .range([mdsHeight, 0])

const yContainer = mdsSvg.append("g")


const xContainer = mdsSvg.append("g")


const pointsContainer = mdsSvg.append('g')

// Add a clipPath: everything out of this area won't be drawn.
const clipMDS = mdsSvg.append("defs").append("svg:clipPath")
    .attr("id", "clipMDS")
    .append("svg:rect")
    .attr("width", mdsWidth )
    .attr("height", mdsHeight )
    .attr("x", 0)
    .attr("y", 0)

// A function that update the chart for given boundaries
const zoomChart = (resetZoom = false) => {

    if(clickDisabled) return

    let extent = null

    if(!resetZoom) {
        extent = d3.event.selection
    }

    // If no selection, back to initial coordinate
    if(!extent){
        if (!idleTimeoutMDS && !resetZoom) return idleTimeoutMDS = setTimeout(idled, 350); // This allows to wait a little bit
        mdsX.domain([-maxX, maxX])
        mdsY.domain([-maxY, maxY])
    }
    else {
        const xEdges = [ mdsX.invert(extent[0][0]), mdsX.invert(extent[1][0]) ]
        const yEdges = [ mdsY.invert(extent[1][1]), mdsY.invert(extent[0][1]) ]
        mdsX.domain(xEdges)
        mdsY.domain(yEdges)
        mdsSvg.select(".brushMDS").call(brushMDS.move, null) // This remove the grey brush area as soon as the selection has been done
    }

    // replace axis
    yContainer.transition().duration(1000).attr("transform", "translate(" + mdsX(0) + ",0)").call(d3.axisLeft(mdsY))
    xContainer.transition().duration(1000).attr("transform", "translate(0," + mdsY(0) + ")").call(d3.axisBottom(mdsX))

    mdsSvg
        .selectAll(".mds-circle")
        .transition().duration(1000)
        .attr("cx",  d => mdsX(d[0]))
        .attr("cy", d => mdsY(d[1]))

}

// Add brushing
const brushMDS = d3.brush()                 // Add the brush feature using the d3.brush function
    .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("end", zoomChart) // Each time the brush selection changes, trigger the 'updateChart' function

pointsContainer
    .append("g")
    .attr("class", "brushMDS")
    .call(brushMDS)

let idleTimeoutMDS
function idled() { idleTimeoutMDS = null; }

// Define the selectNation method
const selectNationForMDS = (key) => selectNation(key)

const updateMDS = (data, start = null, end = null, dispatchLoaded = true) => {
    if(start && end) {
        // Reset chart to default zoom
        zoomChart(true)
        data = data.filter(d => moment(d.created_at).isBefore(moment(end)) && moment(d.created_at).isAfter(moment(start)))
    }

    const tokenizedTweets = []

    data.forEach(d => {
        let tweet = d.text

        // tokenize the sentence
        const tokenizedTweet = tweet.split(' ')

        tokenizedTweets.push(tokenizedTweet)
    })

    const nationsDictionary = {}
    nationsIds.forEach(key => nationsDictionary[key] = [0, 0, 0, 0])

    data.forEach((d, i) => {
        // For each entry create a vector containing the number of retweets, the user's followers number and the number of words of each tweet
        nationsDictionary[d.country_id] = [
            nationsDictionary[d.country_id][0] + parseInt(d.retweet_count),
            nationsDictionary[d.country_id][1] + 1,
            nationsDictionary[d.country_id][2] + tokenizedTweets[i].length
        ]
    })

    Object.keys(nationsDictionary).forEach(key => {
        if(!nationsDictionary[key][1]) return
        nationsDictionary[key][0] = nationsDictionary[key][0] / nationsDictionary[key][1]
        const avgLength = nationsDictionary[key][2] / nationsDictionary[key][1]
        nationsDictionary[key][2] = nationsPopulation[key] ? (nationsDictionary[key][1] / nationsPopulation[key]) : 0
        nationsDictionary[key][3] = nationsCities[key] ? (nationsDictionary[key][1] / nationsCities[key]) : 0
        nationsDictionary[key][1] = avgLength

    })

    const nationsMatrix = Object.values(nationsDictionary)

    const druidMDS = new druid.MDS(nationsMatrix)

    const druidReducedMatrix = druidMDS.transform()

    maxX = d3.max(druidReducedMatrix, d => Math.abs(d[0]))
    maxY = d3.max(druidReducedMatrix, d => Math.abs(d[1]))

    mdsX.domain([-maxX, maxX])
    mdsY.domain([-maxY, maxY])

    yContainer.attr("transform", "translate(" + mdsX(0) + ",0)").call(d3.axisLeft(mdsY))
    xContainer.attr("transform", "translate(0," + mdsY(0) + ")").call(d3.axisBottom(mdsX))

    pointsContainer.selectAll(".mds-circle").remove()

    const points = pointsContainer.selectAll(".mds-circle")

    points
        .data(druidReducedMatrix)
        .enter()
        .append("circle")
        .attr("id", (d, i) => `point-${nationsIds[i]}`)
        .attr('class', 'mds-circle')
        .attr("cx", d => mdsX(d[0]))
        .attr("cy", d => mdsY(d[1]))
        .attr("r", 7)
        .style("fill", "var(--mds-color)")
        .attr("stroke", "var(--mds-stroke)")
        .attr("stroke-width", "1.5")
        .on("mouseover", (d, i) => {
            mdsTooltip.show(d, nationsIds[i], nationsMatrix[i])
        })
        .on("mouseout", (d, i) => {
            mdsTooltip.hide(d, nationsIds[i], nationsMatrix[i])
        })
        .on("click", (d, i) => {
            selectNationForMDS(nationsIds[i])
        })

    // at the start of the webapp select all the nations that are in selectedNation
    selectedNations.forEach((nation, i) => {
        const selectionColor = selectionColors[i%selectionColors.length]
        d3.select(`#point-${nation}`)
            .style("fill", `${selectionColor}`)
        d3.select(`#point-${nation}`).raise()
    })

    if(dispatchLoaded){
        // plot loaded notification
        const loaded = new Event('loaded')
        window.dispatchEvent(loaded)
    }
}


