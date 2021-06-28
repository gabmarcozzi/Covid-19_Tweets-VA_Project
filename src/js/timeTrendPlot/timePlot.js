const timeTrendMargin = { top: 20, right: 50, bottom: 50, left: 50 },
    timeTrendWidth = d3.select("#timeTrendPlot").node().getBoundingClientRect().width - timeTrendMargin.left - timeTrendMargin.right,
    timeTrendHeight = d3.select("#timeTrendPlot").node().getBoundingClientRect().height - timeTrendMargin.top - timeTrendMargin.bottom

// set the ranges
const xAxis = d3.scaleTime().range([0, timeTrendWidth])
const yAxis = d3.scaleLinear().range([timeTrendHeight, 0])

// define the line
const valueTimeLine = d3.line()
    .x(d => xAxis(d['date']))
    .y(d => yAxis(d['close']))

const timeTrendPlot = d3.select("#timeTrendPlot")
    //.append("div")
    //.classed("svg-container", true)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    //.attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1110 278")
    // Class to make it responsive.
    //.classed("svg-content-responsive", true)
    .append("g")
    .attr("transform",
        "translate(" + timeTrendMargin.left + "," + timeTrendMargin.top + ")")


d3.csv("http://localhost:3000/covidTweetsDataset.csv", (error, data) => {
    if (error) throw error

    const tweets = []
    data.forEach(d => {
        tweets.push(d)
    })
    
    // Maintain a dictionary for each path you want to draw
    var dataPath = [];
    const perPeriodData = aggregateForPeriod(tweets, timeGrain)
    const perPeriodValues = Object.entries(perPeriodData).map(([time, count]) => ({
        date: parseTime(time),
        close: count
    }))
    
    perPeriodValues.forEach(v => dataPath.push(v))

    const flattenedData = []
    Object.values(dataPath).forEach(d => {
        flattenedData.push(d)
    })

    // Scale the range of the data
    xAxis.domain(d3.extent(flattenedData, d => d['date']))
    yAxis.domain([0, d3.max(flattenedData, d => d['close'])])

    dataPath.sort(sortByDate)

    timeTrendPlot.append("path")
        .data([dataPath])
        .attr("class", "line-gab")
        .attr("id", `time-trend`)
        .attr("d", valueTimeLine)

    // Add the X Axis
    timeTrendPlot.append("g")
        .attr("transform", "translate(0," + timeTrendHeight + ")")
        .call(d3.axisBottom(xAxis))

    // Add the Y Axis
    timeTrendPlot.append("g")
        .call(d3.axisLeft(yAxis))
})