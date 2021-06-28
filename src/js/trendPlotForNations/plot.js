const nationsTrendMargin = { top: 20, right: 50, bottom: 50, left: 50 },
    nationsTrendWidth = d3.select("#nationsTrendPlot").node().getBoundingClientRect().width - nationsTrendMargin.left - nationsTrendMargin.right,
    nationsTrendHeight = d3.select("#nationsTrendPlot").node().getBoundingClientRect().height - nationsTrendMargin.top - nationsTrendMargin.bottom

// initialize tooltips
const nationTooltip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(nationName => `<strong>Country: </strong><span class='details'> ${nationName}`)

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
    //.append("div")
    //.classed("svg-container", true)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    //.attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 800 552")
    // Class to make it responsive.
    //.classed("svg-content-responsive", true)
    .append("g")
    .attr("transform",
        "translate(" + nationsTrendMargin.left + "," + nationsTrendMargin.top + ")")

// associate tooltips to this plot
nationsTrendPlot.call(nationTooltip)

// Get the data
d3.csv("http://localhost:3000/covidTweetsDataset.csv", (error, data) => {
    if (error) throw error

    // Find All the nations that are present in the dataset
    const perNationTweetCount = {}
    data.forEach(d => {
        if (d.country_id) {
            const place = d.country_id
            // Create an entry if it does not exist or count the numer of tweets for each nation
            if (perNationTweetCount[place]) perNationTweetCount[place].push(d)
            else perNationTweetCount[place] = [d]
        }
    })

    // Maintain a dictionary for each path you want to draw
    dataPaths = {}

    Object.entries(perNationTweetCount).forEach(([nation, data]) => {
        //console.log(data)
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

        // Define the selectNation method
        const selectNationForTrend = () => selectNation(key)
        
        // Add the valueline path.
        nationsTrendPlot.append("path")
            .data([value])
            .attr("class", "line")
            .attr("id", `trend-${key}`)
            .attr("d", valueline)
            .on('mouseover', () => {
                // Get mouse coordinates TODO: tooltip near to the mouse
                const x = d3.event.pageX - document.getElementById('nationsTrendPlot').getBoundingClientRect().x + 10
                const y = d3.event.pageX - document.getElementById('nationsTrendPlot').getBoundingClientRect().y + 10
                nationTooltip.show(idToNation[key])
            })
            .on('mouseout', () => {
                nationTooltip.hide(key)
            })
            .on("click", selectNationForTrend)
    })

    // Add the X Axis
    nationsTrendPlot.append("g")
        .attr("transform", "translate(0," + nationsTrendHeight + ")")
        .call(d3.axisBottom(x))

    // Add the Y Axis
    nationsTrendPlot.append("g")
        .call(d3.axisLeft(y))


    // at the start of the webapp select all the nations that are in selectedNation
    selectedNations.forEach(nation => {
        d3.select(`#trend-${nation}`)
            .style("stroke", "rgb(70, 130, 180)")
    })

})