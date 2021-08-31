const timeTooltip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>Date: </strong><span class='details'>" + d['date'].toLocaleDateString() + "<br></span>" + `<strong># of Tweets: </strong><span class='details'> ${d['close']}`
    })

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

timeTrendPlot.call(timeTooltip)

d3.csv("http://localhost:3000/covidTweetsDataset.csv", (error, data) => {
    if (error) throw error

    const tweets = []
    data.forEach(d => {
        tweets.push(d)
    })
    
    parseTimePlot = d3.timeParse("%d-%b-%Y")

    // Maintain a dictionary for each path you want to draw
    var dataPath = [];
    const perPeriodData = aggregateForPeriod(tweets, 'day')
    console.log(perPeriodData)
    const perPeriodValues = Object.entries(perPeriodData).map(([time, count]) => ({
        date: parseTimePlot(time),
        close: count
    }))
    
    perPeriodValues.forEach(v => dataPath.push(v))
    console.log(dataPath)

    const flattenedData = []
    Object.values(dataPath).forEach(d => {
        flattenedData.push(d)
    })
    console.log(flattenedData)


    // Scale the range of the data
    xAxis.domain(d3.extent(flattenedData, d => d['date']))
    yAxis.domain([0, d3.max(flattenedData, d => d['close'])])

    dataPath.sort(sortByDate)

    // Add the X Axis
    var ciao = timeTrendPlot.append("g")
        .attr("transform", "translate(0," + timeTrendHeight + ")")
        .call(d3.axisBottom(xAxis))

    // Add the Y Axis
    timeTrendPlot.append("g")
        .call(d3.axisLeft(yAxis))

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = timeTrendPlot.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", timeTrendWidth )
        .attr("height", timeTrendHeight )
        .attr("x", 0)
        .attr("y", 0);

    // Add brushing
    var brush = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [timeTrendWidth,timeTrendHeight] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the area variable: where both the area and the brush take place
    var area = timeTrendPlot.append('g')
        .attr("clip-path", "url(#clip)")

    // Create an area generator
    var areaGenerator = d3.area()
        .x(function(d) { return xAxis(d['date']) })
        .y0(y(0))
        .y1(function(d) { return yAxis(d['close']) })

    // Add the area
    area.append("path")
        .data([dataPath])
        .attr("class", "myArea")  // I add the class myArea to be able to modify it later on.
        .attr("fill", "#69b3a2")
        .attr("fill-opacity", .3)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("d", areaGenerator )


    // Add the brushing
    area
        .append("g")
        .attr("class", "brush")
        .call(brush);

    // A function that set idleTimeOut to null
    var idleTimeout
    function idled() { idleTimeout = null; }

    timeTrendPlot.selectAll("dots")
        .data([dataPath])
        .enter()
        .append('g')
        .style("fill", "black")
        .selectAll("myPoints")
        .data(function(d){ return d; })
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xAxis(d['date']) } )
        .attr("cy", function(d) { return yAxis(d['close']) } )
        .attr("r", 2)
        .attr("stroke", "white")
        .on("mouseover", (d) => {
            timeTooltip.show(d)
        })
        .on("mouseout", function(d) {
            timeTooltip.hide(d)
        });

    // A function that update the chart for given boundaries
    function updateChart() {
        dbclick = false
        // What are the selected boundaries?
        extent = d3.event.selection
        
        // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        xAxis.domain([ 4,8])
        }else{
            s = new Date(xAxis.invert(extent[0]))
            s.setDate(s.getDate() + 1)
            s.setHours(00,00,00)
            e = new Date(xAxis.invert(extent[1]))
            e.setHours(00,00,00)

            console.log(s)
            console.log(e)
            xAxis.domain([s, e])
            updateWorldMap(s, e)
            updateNationPlot(s, e)
            // console.log("ALLORA")
            // console.log(xAxis.invert(extent[0]).setHours(00,00,00))
            // var gg = new Date(xAxis.invert(extent[0]))
            // gg.setHours(00, 00, 00)
            // console.log(gg)
            
            area.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
        }

        // Update axis and area position
        ciao.transition().duration(1000).call(d3.axisBottom(xAxis))
        area
            .select('.myArea')
            .transition()
            .duration(1000)
            .attr("d", areaGenerator)
        
        d3.selectAll("circle")
            .remove()

        area.selectAll("dots")
            .data([dataPath])
            .enter()
            .append('g')
            .style("fill", "black")
            .selectAll("myPoints")
            .data(function(d){ return d; })
            .enter()
            .append("circle")
            .transition()
                .attr("cx", function(d) { return xAxis(d['date']) } )
                .attr("cy", function(d) { return yAxis(d['close']) } )
                .attr("r", 4)
                .attr("stroke", "white")
            .duration(1000)
            
        area.selectAll("circle")
            .on("mouseover", (d) => {
                timeTooltip.show(d)
            })
            .on("mouseout", function(d) {
                timeTooltip.hide(d)
            });
    }

    // If user double click, reinitialize the chart
    timeTrendPlot.on("dblclick",function() {
        dbclick = true
        updateWorldMap("Thu Mar 19 2020 00:00:00 GMT+0100 (Ora standard dell’Europa centrale)", "Sat Jan 30 2021 21:25:18 GMT+0100 (Ora standard dell’Europa centrale)")
        updateNationPlot("Thu Mar 19 2020 00:00:00 GMT+0100 (Ora standard dell’Europa centrale)", "Sat Jan 30 2021 21:25:18 GMT+0100 (Ora standard dell’Europa centrale)")
        xAxis.domain(d3.extent(flattenedData, d => d['date']))
        ciao.transition().call(d3.axisBottom(xAxis))
        area
            .select('.myArea')
            .transition()
            .attr("d", areaGenerator)
        
        timeTrendPlot.selectAll("dots")
            .data([dataPath])
            .enter()
            .append('g')
            .style("fill", "black")
            .selectAll("myPoints")
            .data(function(d){ return d; })
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xAxis(d['date']) } )
            .attr("cy", function(d) { return yAxis(d['close']) } )
            .attr("r", 2)
            .attr("stroke", "white")
            .on("mouseover", (d) => {
                timeTooltip.show(d)
            })
            .on("mouseout", function(d) {
                timeTooltip.hide(d)
            });
    });
    
})