const idToNation = {
    '-99': "Northern Cyprus",
    ABV: "Somaliland",
    AFG: "Afghanistan",
    AGO: "Angola",
    ALB: "Albania",
    ARE: "United Arab Emirates",
    ARG: "Argentina",
    ARM: "Armenia",
    ATF: "French Southern and Antarctic Lands",
    AUS: "Australia",
    AUT: "Austria",
    AZE: "Azerbaijan",
    BDI: "Burundi",
    BEL: "Belgium",
    BEN: "Benin",
    BFA: "Burkina Faso",
    BGD: "Bangladesh",
    BGR: "Bulgaria",
    BHS: "The Bahamas",
    BIH: "Bosnia and Herzegovina",
    BLR: "Belarus",
    BLZ: "Belize",
    BOL: "Bolivia",
    BRA: "Brazil",
    BRN: "Brunei",
    BTN: "Bhutan",
    BWA: "Botswana",
    CAF: "Central African Republic",
    CAN: "Canada",
    CHE: "Switzerland",
    CHL: "Chile",
    CHN: "China",
    CIV: "Ivory Coast",
    CMR: "Cameroon",
    COD: "Democratic Republic of the Congo",
    COG: "Republic of the Congo",
    COL: "Colombia",
    CRI: "Costa Rica",
    CUB: "Cuba",
    CYP: "Cyprus",
    CZE: "Czech Republic",
    DEU: "Germany",
    DJI: "Djibouti",
    DNK: "Denmark",
    DOM: "Dominican Republic",
    DZA: "Algeria",
    ECU: "Ecuador",
    EGY: "Egypt",
    ERI: "Eritrea",
    ESH: "Western Sahara",
    ESP: "Spain",
    EST: "Estonia",
    ETH: "Ethiopia",
    FIN: "Finland",
    FJI: "Fiji",
    FLK: "Falkland Islands",
    FRA: "France",
    GAB: "Gabon",
    GBR: "England",
    GEO: "Georgia",
    GHA: "Ghana",
    GIN: "Guinea",
    GMB: "Gambia",
    GNB: "Guinea Bissau",
    GNQ: "Equatorial Guinea",
    GRC: "Greece",
    GRL: "Greenland",
    GTM: "Guatemala",
    GUY: "Guyana",
    HND: "Honduras",
    HRV: "Croatia",
    HTI: "Haiti",
    HUN: "Hungary",
    IDN: "Indonesia",
    IND: "India",
    IRL: "Ireland",
    IRN: "Iran",
    IRQ: "Iraq",
    ISL: "Iceland",
    ISR: "Israel",
    ITA: "Italy",
    JAM: "Jamaica",
    JOR: "Jordan",
    JPN: "Japan",
    KAZ: "Kazakhstan",
    KEN: "Kenya",
    KGZ: "Kyrgyzstan",
    KHM: "Cambodia",
    KOR: "South Korea",
    KWT: "Kuwait",
    LAO: "Laos",
    LBN: "Lebanon",
    LBR: "Liberia",
    LBY: "Libya",
    LKA: "Sri Lanka",
    LSO: "Lesotho",
    LTU: "Lithuania",
    LUX: "Luxembourg",
    LVA: "Latvia",
    MAR: "Morocco",
    MDA: "Moldova",
    MDG: "Madagascar",
    MEX: "Mexico",
    MKD: "Macedonia",
    MLI: "Mali",
    MMR: "Myanmar",
    MNE: "Montenegro",
    MNG: "Mongolia",
    MOZ: "Mozambique",
    MRT: "Mauritania",
    MWI: "Malawi",
    MYS: "Malaysia",
    NAM: "Namibia",
    NCL: "New Caledonia",
    NER: "Niger",
    NGA: "Nigeria",
    NIC: "Nicaragua",
    NLD: "Netherlands",
    NOR: "Norway",
    NPL: "Nepal",
    NZL: "New Zealand",
    OMN: "Oman",
    OSA: "Kosovo",
    PAK: "Pakistan",
    PAN: "Panama",
    PER: "Peru",
    PHL: "Philippines",
    PNG: "Papua New Guinea",
    POL: "Poland",
    PRI: "Puerto Rico",
    PRK: "North Korea",
    PRT: "Portugal",
    PRY: "Paraguay",
    PSE: "West Bank",
    QAT: "Qatar",
    ROU: "Romania",
    RUS: "Russia",
    RWA: "Rwanda",
    SAU: "Saudi Arabia",
    SDN: "Sudan",
    SDS: "South Sudan",
    SEN: "Senegal",
    SLB: "Solomon Islands",
    SLE: "Sierra Leone",
    SLV: "El Salvador",
    SOM: "Somalia",
    SRB: "Republic of Serbia",
    SUR: "Suriname",
    SVK: "Slovakia",
    SVN: "Slovenia",
    SWE: "Sweden",
    SWZ: "Swaziland",
    SYR: "Syria",
    TCD: "Chad",
    TGO: "Togo",
    THA: "Thailand",
    TJK: "Tajikistan",
    TKM: "Turkmenistan",
    TLS: "East Timor",
    TTO: "Trinidad and Tobago",
    TUN: "Tunisia",
    TUR: "Turkey",
    TWN: "Taiwan",
    TZA: "United Republic of Tanzania",
    UGA: "Uganda",
    UKR: "Ukraine",
    URY: "Uruguay",
    USA: "USA",
    UZB: "Uzbekistan",
    VEN: "Venezuela",
    VNM: "Vietnam",
    VUT: "Vanuatu",
    YEM: "Yemen",
    ZAF: "South Africa",
    ZMB: "Zambia",
    ZWE: "Zimbabwe"
}

const nationsIds = Object.keys(idToNation)

const selectedNations = ['USA', 'GBR', 'IND']

var x;
var y;
// Maintain a dictionary for each path you want to draw
dataPaths = {}
const selectNation = (key) => {
    if(selectedNations.includes(key)) {
        delete selectedNations[selectedNations.indexOf(key)]
        d3.select(`#map-${key}`)
        .transition()
        .duration(500)
        .style("opacity", 0.8)
        .style("stroke", "black")
        .style("stroke-width", 0.3)

        d3.select(`#trend-${key}`)
        .transition()
        .duration(500)
        .style("stroke", "rgba(70, 130, 180, 0.2)")
    }
    else {
        selectedNations.push(key)

        d3.select(`#map-${key}`)
        .transition()
        .duration(500)
        .style("stroke", "yellow")
        .style("stroke-width", 3)

        d3.select(`#trend-${key}`)
        .transition()
        .duration(500)
        .style("stroke", "black")
    }
    updateNationPlot(x.domain()[0], x.domain()[1])
}

const timeGrain = 'day'
// parse the date / time
let parseTime
if (timeGrain === 'month') parseTime = d3.timeParse("%b-%Y")
else parseTime = d3.timeParse("%d-%b-%Y")

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
                break;
            default:
                timeStep = [timeChunks[1], timeChunks[5]].join('-')
        }
        
        if (timeDict[timeStep]) timeDict[timeStep] += 1
        else timeDict[timeStep] = 1
        return timeDict
    }, {})
}

const sortByDate = ((a, b) => {
    return new Date(b['date']) - new Date(a['date']);
});

var tweetsByCountryId = {};
var svg;
var dataWorldCountries;
var dbclick = false;
var initialTweets = {};

var color = d3.scaleThreshold()
    .domain([10, 50, 100, 300, 500, 1000, 2000, 5000, 10000, 20000])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);

function updateWorldMap(start, end) {
    if(dbclick) {
        Object.assign(tweetsByCountryId, initialTweets)
    }
    else {
        const s = new Date(start)
        const e = new Date(end)
        
        Object.entries(tweetsByCountryId).forEach(([nation, tweets]) => {
            tw = []
            tweets.forEach(t => {
                const curr = new Date(t.created_at)
                if(curr >= s && curr <= e) {
                    tw.push(t)
                }
            })
            tweetsByCountryId[nation] = tw
        })
        console.log(tweetsByCountryId)
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
        .on('mouseover', function(d) {
            tip.show(d);

            if(!selectedNations.includes(d.id)) {
                d3.select(this)
                .style("opacity", 1)
                .style("stroke", "white")
                .style("stroke-width", 3)
            }
            
        })
        .on('mouseout', function(d) {
            tip.hide(d);

            if(!selectedNations.includes(d.id)) {
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

    selectedNations.forEach(function(nation) {
        d3.select(`#map-${nation}`)
                .style("stroke", "yellow")
                .style("stroke-width", 3)
    })
}

var nationsTrendPlot;
var ationsTrendMargin;
var nationsTrendWidth;
var nationsTrendHeight;

var nationTooltip;

// define the line
var valueline = d3.line()
    .x(d => x(d['date']))
    .y(d => y(d['close']))

function updateNationPlot(start, end) {
    // x.domain(d3.extent(flattenedData, d => d['date']))
    // y.domain([0, d3.max(flattenedData, d => d['close'])])
    
    x.domain([new Date(start), new Date(end)])

    var a = {};
    Object.entries(dataPaths).forEach(([key, value]) => {
        
        //console.log("AO SGHI")
        //console.log(value['date'])
        value.forEach(v => {
            //console.log(v['date'])
            dataInside = new Date(v['date'])
            s = new Date(start)
            s.setDate(s.getDate() - 1)
            e = new Date(end)

            if(dataInside >= s && dataInside <= e) {
                if(a[key]) a[key].push(v)
                else
                    a[key] = [v]
            }
        })
    })

    var max = 0;
    if(selectedNations.length > 0) {
        selectedNations.forEach(elem => {
            if(a[elem]) {
                a[elem].forEach(v => {
                    if(v["close"] > max)
                        max = v["close"]
                })
            }
        })
        console.log(max)
        if(max > 0)
            y.domain([0, max])
    }
    
    nationsTrendPlot.selectAll("g").remove();
    nationsTrendPlot.selectAll("path").remove();

    nationsTrendPlot.append("g")
        .attr("transform", "translate(0," + nationsTrendHeight + ")")
        .call(d3.axisBottom(x))
    // Add the Y Axis
    nationsTrendPlot.append("g")
        .call(d3.axisLeft(y))
    
    Object.entries(dataPaths).forEach(([key, value]) => {
        value.sort(sortByDate)

        // Define the selectNation method
        const selectNationForTrend = () => selectNation(key)
        
        var a = [];
        //console.log("AO SGHI")
        //console.log(value['date'])
        value.forEach(v => {
            //console.log(v['date'])
            dataInside = new Date(v['date'])
            s = new Date(start)
            s.setDate(s.getDate() - 1)
            e = new Date(end)

            if(dataInside >= s && dataInside <= e) {
                a.push(v);
                
            }
        })

        //console.log(a)
        // Add the valueline path.
        nationsTrendPlot.append("path")
            .data([a])
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

    
    // at the start of the webapp select all the nations that are in selectedNation
    selectedNations.forEach(nation => {
        d3.select(`#trend-${nation}`)
            .style("stroke", "black")
    })
}