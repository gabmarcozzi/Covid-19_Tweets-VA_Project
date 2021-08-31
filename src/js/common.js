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
        .style("stroke", "rgba(29, 161, 242, 0.2)")
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

const stopWords = {
    'a': 1,
    'about': 1,
    'above': 1,
    'across': 1,
    'after': 1,
    'again': 1,
    'against': 1,
    'all': 1,
    'almost': 1,
    'alone': 1,
    'along': 1,
    'already': 1,
    'also': 1,
    'although': 1,
    'always': 1,
    'among': 1,
    'an': 1,
    'and': 1,
    'another': 1,
    'any': 1,
    'anybody': 1,
    'anyone': 1,
    'anything': 1,
    'anywhere': 1,
    'are': 1,
    'area': 1,
    'areas': 1,
    'around': 1,
    'as': 1,
    'ask': 1,
    'asked': 1,
    'asking': 1,
    'asks': 1,
    'at': 1,
    'away': 1,
    'b': 1,
    'back': 1,
    'backed': 1,
    'backing': 1,
    'backs': 1,
    'be': 1,
    'became': 1,
    'because': 1,
    'become': 1,
    'becomes': 1,
    'been': 1,
    'before': 1,
    'began': 1,
    'behind': 1,
    'being': 1,
    'beings': 1,
    'best': 1,
    'better': 1,
    'between': 1,
    'big': 1,
    'both': 1,
    'but': 1,
    'by': 1,
    'c': 1,
    'came': 1,
    'can': 1,
    'cannot': 1,
    'case': 1,
    'cases': 1,
    'certain': 1,
    'certainly': 1,
    'clear': 1,
    'clearly': 1,
    'come': 1,
    'could': 1,
    'd': 1,
    'did': 1,
    'differ': 1,
    'different': 1,
    'differently': 1,
    'do': 1,
    'does': 1,
    'done': 1,
    'down': 1,
    'down': 1,
    'downed': 1,
    'downing': 1,
    'downs': 1,
    'during': 1,
    'e': 1,
    'each': 1,
    'early': 1,
    'either': 1,
    'end': 1,
    'ended': 1,
    'ending': 1,
    'ends': 1,
    'enough': 1,
    'even': 1,
    'evenly': 1,
    'ever': 1,
    'every': 1,
    'everybody': 1,
    'everyone': 1,
    'everything': 1,
    'everywhere': 1,
    'f': 1,
    'face': 1,
    'faces': 1,
    'fact': 1,
    'facts': 1,
    'far': 1,
    'felt': 1,
    'few': 1,
    'find': 1,
    'finds': 1,
    'first': 1,
    'for': 1,
    'four': 1,
    'from': 1,
    'full': 1,
    'fully': 1,
    'further': 1,
    'furthered': 1,
    'furthering': 1,
    'furthers': 1,
    'g': 1,
    'gave': 1,
    'general': 1,
    'generally': 1,
    'get': 1,
    'gets': 1,
    'give': 1,
    'given': 1,
    'gives': 1,
    'go': 1,
    'going': 1,
    'good': 1,
    'goods': 1,
    'got': 1,
    'great': 1,
    'greater': 1,
    'greatest': 1,
    'group': 1,
    'grouped': 1,
    'grouping': 1,
    'groups': 1,
    'h': 1,
    'had': 1,
    'has': 1,
    'have': 1,
    'having': 1,
    'he': 1,
    'her': 1,
    'here': 1,
    'herself': 1,
    'high': 1,
    'high': 1,
    'high': 1,
    'higher': 1,
    'highest': 1,
    'him': 1,
    'himself': 1,
    'his': 1,
    'how': 1,
    'however': 1,
    'i': 1,
    'if': 1,
    'important': 1,
    'in': 1,
    'interest': 1,
    'interested': 1,
    'interesting': 1,
    'interests': 1,
    'into': 1,
    'is': 1,
    'it': 1,
    'its': 1,
    'itself': 1,
    'j': 1,
    'just': 1,
    'k': 1,
    'keep': 1,
    'keeps': 1,
    'kind': 1,
    'knew': 1,
    'know': 1,
    'known': 1,
    'knows': 1,
    'l': 1,
    'large': 1,
    'largely': 1,
    'last': 1,
    'later': 1,
    'latest': 1,
    'least': 1,
    'less': 1,
    'let': 1,
    'lets': 1,
    'like': 1,
    'likely': 1,
    'long': 1,
    'longer': 1,
    'longest': 1,
    'm': 1,
    'made': 1,
    'make': 1,
    'making': 1,
    'man': 1,
    'many': 1,
    'may': 1,
    'me': 1,
    'member': 1,
    'members': 1,
    'men': 1,
    'might': 1,
    'more': 1,
    'most': 1,
    'mostly': 1,
    'mr': 1,
    'mrs': 1,
    'much': 1,
    'must': 1,
    'my': 1,
    'myself': 1,
    'n': 1,
    'necessary': 1,
    'need': 1,
    'needed': 1,
    'needing': 1,
    'needs': 1,
    'never': 1,
    'new': 1,
    'new': 1,
    'newer': 1,
    'newest': 1,
    'next': 1,
    'no': 1,
    'nobody': 1,
    'non': 1,
    'noone': 1,
    'not': 1,
    'nothing': 1,
    'now': 1,
    'nowhere': 1,
    'number': 1,
    'numbers': 1,
    'o': 1,
    'of': 1,
    'off': 1,
    'often': 1,
    'old': 1,
    'older': 1,
    'oldest': 1,
    'on': 1,
    'once': 1,
    'one': 1,
    'only': 1,
    'open': 1,
    'opened': 1,
    'opening': 1,
    'opens': 1,
    'or': 1,
    'order': 1,
    'ordered': 1,
    'ordering': 1,
    'orders': 1,
    'other': 1,
    'others': 1,
    'our': 1,
    'out': 1,
    'over': 1,
    'p': 1,
    'part': 1,
    'parted': 1,
    'parting': 1,
    'parts': 1,
    'per': 1,
    'perhaps': 1,
    'place': 1,
    'places': 1,
    'point': 1,
    'pointed': 1,
    'pointing': 1,
    'points': 1,
    'possible': 1,
    'present': 1,
    'presented': 1,
    'presenting': 1,
    'presents': 1,
    'problem': 1,
    'problems': 1,
    'put': 1,
    'puts': 1,
    'q': 1,
    'quite': 1,
    'r': 1,
    'rather': 1,
    'really': 1,
    'right': 1,
    'right': 1,
    'room': 1,
    'rooms': 1,
    's': 1,
    'said': 1,
    'same': 1,
    'saw': 1,
    'say': 1,
    'says': 1,
    'second': 1,
    'seconds': 1,
    'see': 1,
    'seem': 1,
    'seemed': 1,
    'seeming': 1,
    'seems': 1,
    'sees': 1,
    'several': 1,
    'shall': 1,
    'she': 1,
    'should': 1,
    'show': 1,
    'showed': 1,
    'showing': 1,
    'shows': 1,
    'side': 1,
    'sides': 1,
    'since': 1,
    'small': 1,
    'smaller': 1,
    'smallest': 1,
    'so': 1,
    'some': 1,
    'somebody': 1,
    'someone': 1,
    'something': 1,
    'somewhere': 1,
    'state': 1,
    'states': 1,
    'still': 1,
    'still': 1,
    'such': 1,
    'sure': 1,
    't': 1,
    'take': 1,
    'taken': 1,
    'than': 1,
    'that': 1,
    'the': 1,
    'their': 1,
    'them': 1,
    'then': 1,
    'there': 1,
    'therefore': 1,
    'these': 1,
    'they': 1,
    'thing': 1,
    'things': 1,
    'think': 1,
    'thinks': 1,
    'this': 1,
    'those': 1,
    'though': 1,
    'thought': 1,
    'thoughts': 1,
    'three': 1,
    'through': 1,
    'thus': 1,
    'to': 1,
    'today': 1,
    'together': 1,
    'too': 1,
    'took': 1,
    'toward': 1,
    'turn': 1,
    'turned': 1,
    'turning': 1,
    'turns': 1,
    'two': 1,
    'u': 1,
    'under': 1,
    'until': 1,
    'up': 1,
    'upon': 1,
    'us': 1,
    'use': 1,
    'used': 1,
    'uses': 1,
    'v': 1,
    'very': 1,
    'w': 1,
    'want': 1,
    'wanted': 1,
    'wanting': 1,
    'wants': 1,
    'was': 1,
    'way': 1,
    'ways': 1,
    'we': 1,
    'well': 1,
    'wells': 1,
    'went': 1,
    'were': 1,
    'what': 1,
    'when': 1,
    'where': 1,
    'whether': 1,
    'which': 1,
    'while': 1,
    'who': 1,
    'whole': 1,
    'whose': 1,
    'why': 1,
    'will': 1,
    'with': 1,
    'within': 1,
    'without': 1,
    'work': 1,
    'worked': 1,
    'working': 1,
    'works': 1,
    'would': 1,
    'x': 1,
    'y': 1,
    'year': 1,
    'years': 1,
    'yet': 1,
    'you': 1,
    'young': 1,
    'younger': 1,
    'youngest': 1,
    'your': 1,
    'yours': 1,
    'z': 1
}

window.onload = () => {
    document.getElementById("loadedPage").style.display = "block"
    document.getElementById("loadedPage").style.display = "none"
    document.getElementById("loader").style.display = "block"
    //updateNationPlot(x.domain()[0], x.domain()[1])
}

const timeGrain = 'month'
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
    nationsTrendPlot.selectAll("dots").remove();

    nationsTrendPlot.append("g")
        .attr("transform", "translate(0," + nationsTrendHeight + ")")
        .call(d3.axisBottom(x))
    // Add the Y Axis
    nationsTrendPlot.append("g")
        .call(d3.axisLeft(y))
    
    var b = []
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
            //s.setDate(s.getDate() - 1)
            e = new Date(end)

            if(dataInside >= s && dataInside <= e) {
                a.push(v);

            }
        })

        b.push.apply(b, a)

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

        console.log(a)
        if(selectedNations.includes(key)) {
            nationsTrendPlot.selectAll("dots")
                .data([a])
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
        }
    })

    // at the start of the webapp select all the nations that are in selectedNation
    selectedNations.forEach(nation => {
        d3.select(`#trend-${nation}`)
            .style("stroke", "black")
    })
}

let loadedViews = 0

// loading view
window.addEventListener('loaded', event => {
    loadedViews += 1
    if(loadedViews === 4) {
        loadedViews = 0
        console.log('loaded')
        document.getElementById("loader").style.display = "none"
        document.getElementById("loadedPage").style.display = "block"
    }
}, false)