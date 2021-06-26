var format = d3.format(",");
var tweetsByCountryId = {};

// Set tooltips
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong># of Tweets: </strong><span class='details'>" + format(tweetsByCountryId[d.id].length) + "</span>";
    })

var margin = { top: 0, right: 0, bottom: 0, left: 0 },
    width = d3.select("#worldmap").node().getBoundingClientRect().width - margin.left - margin.right,
    height = d3.select("#worldmap").node().getBoundingClientRect().height - margin.top - margin.bottom;

var color = d3.scaleThreshold()
    .domain([10, 50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);

var path = d3.geoPath();

var svg = d3.select("#worldmap") 
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    //.attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1143 812")
    .append('g')
    .attr('class', 'map')

var projection = d3.geoMercator()
    .scale(190)
    .translate([width / 2.1, height/ 1.15])

var path = d3.geoPath().projection(projection)

svg.call(tip)

queue()
    .defer(d3.json, "http://localhost:3000/world_countries.json")
    .defer(d3.csv, "http://localhost:3000/covidTweetsDataset.csv")
    //.defer(d3.tsv, "http://localhost:3000/world_population.tsv")
    .await(ready)

function ready(error, data, tweets) {

    tweets.forEach(t => {
        if(tweetsByCountryId[t.country_id])
            tweetsByCountryId[t.country_id].push(t)
        else 
            tweetsByCountryId[t.country_id] = [t]
    })
    console.log(tweetsByCountryId)

    data.features.forEach(f => {
        if(!tweetsByCountryId[f.id])
            tweetsByCountryId[f.id] = []
    })
    // tweets.forEach(t => {
    //     data.features.forEach(f => {
    //         f.geometry.coordinates.forEach(c => {
    //             if(d3.polygonContains(c, t.coordinates.split(','))) {
    //                 // if (tweetsById[f.id]) 
    //                 //     tweetsById[f.id].push(t)
    //                 // else 
    //                 //     tweetsById[f.id] = [t]
    //                 console.log("ciao")
                    
    //             }
    //         })
    //     })
    // })

        
    //population.forEach(function(d) { populationById[d.id] = +d.population })
    //data.features.forEach(function(d) { d.population = tweetsByCountryId[d.id] })

    var clicked = []

    svg
        .attr("class", "countries")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("d", path)
        .style("fill", function(d) { return color(tweetsByCountryId[d.id].length) })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity", 0.8)
        // tooltips
        .style("stroke", "white")
        .style('stroke-width', 0.3)
        .on('mouseover', function(d) {
            tip.show(d);

            if(!clicked.includes(d)) {
                d3.select(this)
                .style("opacity", 1)
                .style("stroke", "white")
                .style("stroke-width", 3)
            }
            
        })
        .on('mouseout', function(d) {
            tip.hide(d);

            if(!clicked.includes(d)) {
                d3.select(this)
                .style("opacity", 0.8)
                .style("stroke", "white")
                .style("stroke-width", 0.3)
            }
        })
        .on("click", function(d) {
            if(clicked.includes(d)) {
                delete clicked[clicked.indexOf(d)]
                d3.select(this)
                .style("opacity", 0.8)
                .style("stroke", "white")
                .style("stroke-width", 0.3)
            }
            else {
                clicked.push(d)
                d3.select(this)
                .style("stroke", "yellow")
                .style("stroke-width", 3)
            }
                
        })

    svg
        .append("path")
        .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id }))
        // .datum(topojson.mesh(data.features, function(a, b) { return a !== b }))
        .attr("class", "names")
        .attr("d", path)
}