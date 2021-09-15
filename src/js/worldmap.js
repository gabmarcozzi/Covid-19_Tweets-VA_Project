var format = d3.format(",");

// Set tooltips
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .html(function (d) {
        return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong># of Tweets: </strong><span class='details'>" + format(tweetsByCountryId[d.id].length) + "</span>";
    })

var margin = { top: 0, right: 0, bottom: 0, left: 0 },
    width = d3.select("#worldmap").node().getBoundingClientRect().width - margin.left - margin.right,
    height = d3.select("#worldmap").node().getBoundingClientRect().height - margin.top - margin.bottom



var path = d3.geoPath();

svg = d3.select("#worldmap")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 900 880")
    .append('g')
    .attr('class', 'map')

var projection = d3.geoMercator()
    .scale(190)
    .translate([width / 2.1, height / 1.15])

var path = d3.geoPath().projection(projection)

svg.call(tip)

queue()
    .defer(d3.json, "http://localhost:3000/world_countries.json")
    .defer(d3.csv, "http://localhost:3000/covidTweetsDataset.csv")
    .await(ready)

const mouseEventHandler = (event) => {
    const mousePosX = event.clientX
    const mousePosY = event.clientY
    const halfRectHeight = document.getElementById('worldmap').getBoundingClientRect().height/2

    if(mousePosY < halfRectHeight) {
        tip.attr('style', `top:${mousePosY}px; left:${mousePosX}px; transform: translate(-50%, 20%);`)
    }
    else {
        tip.attr('style', `top:${mousePosY}px; left:${mousePosX}px; transform: translate(-50%, -120%);`)
    }
}

function updateWorldMap(start, end) {
    if(!dbclick) {
        Object.assign(tweetsByCountryId, initialTweets)
    }
    else {
        const s = new Date(start)
        const e = new Date(end)

        ende = new Date(e.getFullYear(), e.getMonth()+1, 1);
        ende.setDate(en.getDate() - 1)
        ende.setHours(23,59,00)

        Object.entries(tweetsByCountryId).forEach(([nation, tweets]) => {
            tw = []
            tweets.forEach(t => {
                const curr = new Date(t.created_at)
                if(curr >= s && curr <= ende) {
                    tw.push(t)
                }
            })
            tweetsByCountryId[nation] = tw
        })
    }


    const selectNationForMap = function(d) {selectNation(d.id)}

    svg.selectAll("*").remove();

    svg
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        //.attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1143 812")
        .append('gA')
        .attr('class', 'map')

    svg.call(tip)

    svg
        .attr("class", "countries")
        .selectAll("path")
        .data(dataWorldCountries.features)
        .enter().append("path")
        .attr("d", path)
        .attr('id', function(d) {return `map-${d.id}`})
        .style("fill", function(d) { return color(tweetsByCountryId[d.id].length) })
        .style('stroke', 'black')
        .style('stroke-width', 1.5)
        .style("opacity", 0.8)
        // tooltips
        .style("stroke", "black")
        .style('stroke-width', 0.3)
        .on('mouseover', function (d) {

            document.addEventListener('mousemove', mouseEventHandler, true)

            tip.show(d);

            if (!selectedNations.includes(d.id)) {
                d3.select(this)
                    .style("opacity", 1)
                    .style("stroke", "white")
                    .style("stroke-width", 3)
            }

        })
        .on('mouseout', function (d) {

            tip.hide(d);

            document.removeEventListener('mousemove', mouseEventHandler, true)

            if (!selectedNations.includes(d.id)) {
                d3.select(this)
                    .style("opacity", 0.8)
                    .style("stroke", "black")
                    .style("stroke-width", 0.3)
            }
        })
        .on("click", selectNationForMap)

    svg
        .append("path")
        .datum(topojson.mesh(dataWorldCountries.features, function(a, b) { return a.id !== b.id }))
        // .datum(topojson.mesh(data.features, function(a, b) { return a !== b }))
        .attr("class", "names")
        .attr("d", path)

    selectedNations.forEach(function(nation, i) {
        const selectionColor = selectionColors[i%selectionColors.length]
        d3.select(`#map-${nation}`)
            .style("stroke", `${selectionColor}`)
            .style("stroke-width", 3)
    })

    // plot loaded notification
    const loaded = new Event('loaded')
    window.dispatchEvent(loaded)
}

function ready(error, data, tweets) {
    dataWorldCountries = data
    tweets.forEach(t => {
        if(tweetsByCountryId[t.country_id]) {
            tweetsByCountryId[t.country_id].push(t)
            initialTweets[t.country_id].push(t)
        }
        else {
            tweetsByCountryId[t.country_id] = [t]
            initialTweets[t.country_id] = [t]
        }

    })

    data.features.forEach(f => {
        if(!tweetsByCountryId[f.id]) {
            tweetsByCountryId[f.id] = []
            initialTweets[f.id] = []
        }

    })

    // Define the selectNation method
    const selectNationForMap = function (d) { selectNation(d.id) }

    svg
        .attr("class", "countries")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("d", path)
        .attr('id', function (d) { return `map-${d.id}` })
        .style("fill", function (d) { return color(tweetsByCountryId[d.id].length) })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity", 0.8)
        // tooltips
        .style("stroke", "black")
        .style('stroke-width', 0.3)
        .on('mouseover', function (d) {

            document.addEventListener('mousemove', mouseEventHandler, true)

            tip.show(d);

            if (!selectedNations.includes(d.id)) {
                d3.select(this)
                    .style("opacity", 1)
                    .style("stroke", "white")
                    .style("stroke-width", 3)
            }

        })
        .on('mouseout', function (d) {

            tip.hide(d);

            document.removeEventListener('mousemove', mouseEventHandler, true)

            if (!selectedNations.includes(d.id)) {
                d3.select(this)
                .style("opacity", 0.8)
                .style("stroke", "black")
                .style("stroke-width", 0.3)
            }
        })
        .on("click", selectNationForMap)

    svg
        .append("path")
        .datum(topojson.mesh(data.features, function (a, b) { return a.id !== b.id }))
        // .datum(topojson.mesh(data.features, function(a, b) { return a !== b }))
        .attr("class", "names")
        .attr("d", path)

    // plot loaded notification
    const loaded = new Event('loaded')
    window.dispatchEvent(loaded)
}