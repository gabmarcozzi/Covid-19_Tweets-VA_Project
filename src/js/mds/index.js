// Start to set the scatterplot
var mdsMargin = {top: 10, right: 0, bottom: 10, left: 50},
    mdsWidth = d3.select("#mds").node().getBoundingClientRect().width - mdsMargin.left - mdsMargin.right,
    mdsHeight = d3.select("#mds").node().getBoundingClientRect().height - mdsMargin.top - mdsMargin.bottom

// append the svg object to the body of the page
var mdsSvg = d3.select("#mds")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 460 428")
    .append("g")
    .attr("transform",
        "translate(" + mdsMargin.left + "," + mdsMargin.top + ")")

// Add X axis
var mdsX = d3.scaleLinear()
    .range([0, mdsWidth])

// Add Y axis
var mdsY = d3.scaleLinear()
    .range([mdsHeight, 0])

const yContainer = mdsSvg.append("g")


const xContainer = mdsSvg.append("g")


const pointsContainer = mdsSvg.append('g')

const updateMDS = (data, start = null, end = null) => {
    if(start && end) {
        data = data.filter(d => moment(d.created_at).isBefore(moment(end)) && moment(d.created_at).isAfter(moment(start)))
    }

    const tweetsMatrix = data.map(d => {
        const tokenizedTweet = d.text.split(' ')
        // For each entry create a vector containing the number of retweets, the user's followers number and the number of words of each tweet
        return [parseInt(d.retweet_count), parseInt(d.user_friends_count), tokenizedTweet.length, moment(d.created_at).diff(moment('01-03-2020', 'DD-MM-YYYY'), 'day')]
    })

    const cutMatrix = tweetsMatrix.slice(0, 5000)

    const druidMDS = new druid.MDS(cutMatrix)

    const druidReducedMatrix = druidMDS.transform()

    const maxX = d3.max(druidReducedMatrix, d => Math.abs(d[0]))
    const maxY = d3.max(druidReducedMatrix, d => Math.abs(d[1]))

    mdsX.domain([-maxX, maxX])
    mdsY.domain([-maxY, maxY])

    yContainer.attr("transform", "translate(" + mdsX(0) + ",0)").call(d3.axisLeft(mdsY))
    xContainer.attr("transform", "translate(0," + mdsY(0) + ")").call(d3.axisBottom(mdsX))

    const points = pointsContainer.selectAll("circle")

    console.log(points._groups[0].length)

    points
        .data(druidReducedMatrix)
        .enter()
        .append("circle")
        .attr("cx", d => mdsX(d[0]))
        .attr("cy", d => mdsY(d[1]))
        .attr("r", 2)
        .style("fill", "#1DA1F2")

    points.exit().remove()
}


d3.csv("http://localhost:3000/covidTweetsDataset.csv", (error, data) => {
    if (error) throw error

    updateMDS(data)

    // plot loaded notification
    const loaded = new Event('loaded')
    window.dispatchEvent(loaded)
})