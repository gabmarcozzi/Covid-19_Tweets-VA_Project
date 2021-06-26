const nationsTrendMargin = { top: 20, right: 50, bottom: 50, left: 50 },
    nationsTrendWidth = d3.select("#nationsTrendPlot").node().getBoundingClientRect().width - nationsTrendMargin.left - nationsTrendMargin.right,
    nationsTrendHeight = d3.select("#nationsTrendPlot").node().getBoundingClientRect().height - nationsTrendMargin.top - nationsTrendMargin.bottom

const timeGrain = 'month'
// parse the date / time
let parseTime
if (timeGrain === 'month') parseTime = d3.timeParse("%b-%Y")
else parseTime = d3.timeParse("%d-%b-%Y")

// set the ranges
const x = d3.scaleTime().range([0, nationsTrendWidth])
const y = d3.scaleLinear().range([nationsTrendHeight, 0])

// define the line
const valueline = d3.line()
    .x(d => x(d['date']))
    .y(d => y(d['close']))

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
const nationsTrendPlot = d3.select("#nationsTrendPlot")
    .append("div")
    .classed("svg-container", true)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 800 552")
    // Class to make it responsive.
    .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform",
        "translate(" + nationsTrendMargin.left + "," + nationsTrendMargin.top + ")")


//#region Helper Functions
const aggregateForPeriod = (data, timeRange) => {
    // Iterate through data
    return data.reduce((timeDict, d) => {
        // Split date in chunks and take the desired timestep
        const timeChunks = d['created_at'].split(' ')
        let timeStep
        switch (timeRange) {
            case 'day':
                timeStep = [timeChunks[2], timeChunks[1], timeChunks[5]].join('-')
            default:
                timeStep = [timeChunks[1], timeChunks[5]].join('-')
        }
        if (timeDict[timeStep]) timeDict[timeStep] += 1
        else timeDict[timeStep] = 1

        return timeDict
    }, {})
}

const sortByDate = ((a,b) => {
    return new Date(b['date']) - new Date(a['date']);
});
//#endregion

// Get the data
d3.csv("http://localhost:3000/covidTweetsDataset.csv", (error, data) => {
    if (error) throw error;

    // Find All the nations that are present in the dataset
    const perNationTweetCount = {}
    data.forEach(d => {
        if (d.place) {
            // d.place is like London, England. Take the nation
            const place = d.place.split(',')[1]
                // Create an entry if it does not exist or count the numer of tweets for each nation
            if (perNationTweetCount[place]) perNationTweetCount[place].push(d)
            else perNationTweetCount[place] = [d]
        }
    })

    // Maintain a dictionary for each path you want to draw
    dataPaths = {}

    Object.entries(perNationTweetCount).forEach(([nation, data]) => {
        const perPeriodData = aggregateForPeriod(data, timeGrain)
        const perPeriodValues = Object.entries(perPeriodData).map(([time, count]) => ({
            date: parseTime(time),
            close: count
        }))
        if (dataPaths[nation]) perPeriodValues.forEach(v => dataPaths[nation].push(v))
        else dataPaths[nation] = perPeriodValues
    })

    const flattenedData = []
    Object.values(dataPaths).forEach(dp => dp.forEach(d => {
        flattenedData.push(d)
    }))

    // Scale the range of the data
    x.domain(d3.extent(flattenedData, d => d['date']))
    y.domain([0, d3.max(flattenedData, d => d['close'])])

    Object.entries(dataPaths).forEach(([key, value]) => {
        value.sort(sortByDate)
        //console.log(value)
        // Add the valueline path.
        nationsTrendPlot.append("path")
        .data([value])
        .attr("class", "line")
        .attr("d", valueline)
    })

    // Add the X Axis
    nationsTrendPlot.append("g")
        .attr("transform", "translate(0," + nationsTrendHeight + ")")
        .call(d3.axisBottom(x))

    // Add the Y Axis
    nationsTrendPlot.append("g")
        .call(d3.axisLeft(y))

})