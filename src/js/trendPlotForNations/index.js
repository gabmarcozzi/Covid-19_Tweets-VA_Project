nationsTrendMargin = { top: 20, right: 50, bottom: 50, left: 50 }
nationsTrendWidth = d3.select("#nationsTrendPlot").node().getBoundingClientRect().width - nationsTrendMargin.left - nationsTrendMargin.right
nationsTrendHeight = d3.select("#nationsTrendPlot").node().getBoundingClientRect().height - nationsTrendMargin.top - nationsTrendMargin.bottom

// initialize tooltips
nationTooltip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(nationName => `<strong>Country: </strong><span class='details'> ${nationName}`)

// initialize tooltips
nationTooltipDot = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d, nationName) {
        return `<strong>Country: </strong><span class='details'> ${nationName}` + "<br></span>" + "<strong>Month: </strong><span class='details'>" + conv(d['date'].getMonth()) + "<br></span>" + `<strong># of Tweets: </strong><span class='details'> ${d['close']}`
    }) 

// set the ranges
const x = d3.scaleTime().range([0, nationsTrendWidth])
const y = d3.scaleLinear().range([nationsTrendHeight, 0])


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
nationsTrendPlot = d3.select("#nationsTrendPlot")
    .append("div")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 800 552")
    .append("g")
    .attr("transform",
        "translate(" + nationsTrendMargin.left + "," + nationsTrendMargin.top + ")")

// associate tooltips to this plot
nationsTrendPlot.call(nationTooltip)
nationsTrendPlot.call(nationTooltipDot)

const trendMouseEventHandler = (event) => {
    const mousePosX = event.clientX
    const mousePosY = event.clientY
    const halfRectHeight = document.getElementById('nationsTrendPlot').getBoundingClientRect().height/2

    if(mousePosY < halfRectHeight) {
        nationTooltip.attr('style', `top:${mousePosY}px; left:${mousePosX}px; transform: translate(-50%, 20%);`)
    }
    else {
        nationTooltip.attr('style', `top:${mousePosY}px; left:${mousePosX}px; transform: translate(-50%, -120%);`)
    }
}

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

    Object.entries(perNationTweetCount).forEach(([nation, data]) => {
        const perPeriodData = aggregateForPeriod(data, timeGrain)
        const perPeriodValues = Object.entries(perPeriodData).map(([time, count]) => ({
            date: parseTime(time),
            close: count
        }))
        if (dataPaths[nation]) perPeriodValues.forEach(v => dataPaths[nation].push(v))
        else dataPaths[nation] = perPeriodValues
    })

    Object.entries(dataPaths).forEach(([key, value]) => {
        var currDate = new Date("Thu Mar 19 2020 00:00:00 GMT+0200 (Ora standard dell’Europa centrale)")
        var ending = new Date("Mon Feb 01 2021 00:00:00 GMT+0200 (Ora standard dell’Europa centrale)")

        var newValues = []

        while (currDate.getTime() != ending.getTime()) {
            found = false
            value.forEach(v => {
                aDate = new Date(v["date"])
                if(aDate.getTime() == currDate.getTime())
                    found = true;
            })
            if (!found) {
                var insert = {
                    date: new Date(currDate.getTime()),
                    close: 0
                }
                newValues.push(insert)
            }
            currDate.setDate(currDate.getDate() + 1)
        }
        //console.log("USCITO DAL LOOP")
        //newValues.forEach(v => dataPaths[key].push(v))
    })

    //console.log(dataPaths)
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

                document.addEventListener('mousemove', trendMouseEventHandler, true)

                nationTooltip.show(idToNation[key])
            })
            .on('mouseout', () => {
                document.removeEventListener('mousemove', trendMouseEventHandler, true)
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
            .style("stroke", "yellow");
        
        d3.select(`#trend-${nation}`).raise()
            
    })

    Object.entries(dataPaths).forEach(([key, value]) => {
        value.sort(sortByDate)

        if(selectedNations.includes(key)) {
            nationsTrendPlot.selectAll("dots")
            .data([value])
            .enter()
            .append('g')
            .style("fill", "black")
            .selectAll("myPoints")
            .data(function(d){ return d; })
            .enter()
            .append("circle")
            .attr("cx", function(d) { return x(d['date']) } )
            .attr("cy", function(d) { return y(d['close']) } )
            .attr("r", 4)
            .attr("stroke", "white")
            .on("mouseover", (d) => {
                nationTooltipDot.show(d, idToNation[key])
            })
            .on("mouseout", function(d) {
                nationTooltipDot.hide(d, idToNation[key])
            });
        }
    })

    // plot loaded notification
    const loaded = new Event('loaded')
    window.dispatchEvent(loaded)
})