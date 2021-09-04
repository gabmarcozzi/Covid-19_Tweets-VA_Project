let maxX
let maxY

const mdsTooltip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        return `<strong>X: </strong><span class='details'>${d[0]}` + "<br></span>" + `<strong>Y: </strong><span class='details'> ${d[1]}`
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
    .attr("viewBox", "0 0 460 428")
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

// A function that update the chart for given boundaries
function zoomChart(resetZoom = false) {

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
        .selectAll("circle")
        .transition().duration(1000)
        .attr("cx",  d => mdsX(d[0]))
        .attr("cy", d => mdsY(d[1]))

}

const updateMDS = (data, start = null, end = null, dispatchLoaded = true) => {
    if(start && end) {
        data = data.filter(d => moment(d.created_at).isBefore(moment(end)) && moment(d.created_at).isAfter(moment(start)))
        // Reset chart to default zoom
        zoomChart(true)
    }

    const tweetsMatrix = data.map((d, i) => {
        // For each entry create a vector containing the number of retweets, the user's followers number and the number of words of each tweet
        return [parseInt(d.retweet_count), parseInt(d.user_friends_count), tokenizedTweets[i].length, moment(d.created_at).diff(moment('01-03-2020', 'DD-MM-YYYY'), 'day')]
    })


    // FIXME
    const cutMatrix = tweetsMatrix.slice(0, 5000)

    const druidMDS = new druid.MDS(cutMatrix)

    const druidReducedMatrix = druidMDS.transform()

    maxX = d3.max(druidReducedMatrix, d => Math.abs(d[0]))
    maxY = d3.max(druidReducedMatrix, d => Math.abs(d[1]))

    mdsX.domain([-maxX, maxX])
    mdsY.domain([-maxY, maxY])

    yContainer.attr("transform", "translate(" + mdsX(0) + ",0)").call(d3.axisLeft(mdsY))
    xContainer.attr("transform", "translate(0," + mdsY(0) + ")").call(d3.axisBottom(mdsX))

    const points = pointsContainer.selectAll("circle")

    points
        .data(druidReducedMatrix)
        .enter()
        .append("circle")
        .attr("cx", d => mdsX(d[0]))
        .attr("cy", d => mdsY(d[1]))
        .attr("r", 5)
        .attr("stroke", "black")
        .style("fill", "#1DA1F2")
        .on("mouseover", (d) => {
            mdsTooltip.show(d)
        })
        .on("mouseout", function (d) {
            mdsTooltip.hide(d)
        })

    points.exit().remove()

    if(dispatchLoaded){
        // plot loaded notification
        const loaded = new Event('loaded')
        window.dispatchEvent(loaded)
    }
}

$("#reload-button").click(() => {
    $("#loader").show()
    $("#loadedPage").hide()

    $("#reload-button")
        .removeClass('mds-button')
        .prop('disabled',true)

    setTimeout(() => {
        updateMDS(dataStorage, startInterval, endInterval, false)

        $("#loader").hide()
        $("#loadedPage").show()
    },500)
})


