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

function conv(x) {
    var out;
    if(x == 0) out = "January"
    if(x == 1) out = "February"
    if(x == 2) out = "March"
    if(x == 3) out = "April"
    if(x == 4) out = "May"
    if(x == 5) out = "June"
    if(x == 6) out = "July"
    if(x == 7) out = "August"
    if(x == 8) out = "September"
    if(x == 9) out = "October"
    if(x == 10) out = "November"
    if(x == 11) out = "December"
    return out;
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
        
        //console.log("Print list: " + selectedNations)
        
        emptyList = true;
        selectedNations.forEach(elem => {
            if(elem != "")
                emptyList = false;
        })

        if(emptyList) {
            console.log("entro")
            y.domain([0, d3.max(flattenedData, d => d['close'])])
            
            nationsTrendPlot.select("g")
                .call(d3.axisLeft(y))
        }
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
    updateButtons()
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
    'amp': 1,
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

var dateList = [
    new Date("Mar 01 2020 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)"),
    new Date("Apr 01 2020 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)"),
    new Date("May 01 2020 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)"),
    new Date("Jun 01 2020 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)"),
    new Date("Jul 01 2020 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)"),
    new Date("Aug 01 2020 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)"),
    new Date("Sep 01 2020 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)"),
    new Date("Oct 01 2020 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)"),
    new Date("Nov 01 2020 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)"),
    new Date("Dec 01 2020 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)"),
    new Date("Jan 01 2021 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)"),
    new Date("Feb 01 2021 00:00:00 GMT+0000 (Ora standard dell’Europa centrale)")
]
window.onload = () => {
    $("#loadedPage").show()
    $("#loadedPage").hide()
    $("#loader").show()
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

var nationsTrendPlot;
var nationsTrendMargin;
var nationsTrendWidth;
var nationsTrendHeight;

var nationTooltip;
var nationTooltipDot;
// define the line
var valueline = d3.line()
    .x(d => x(d['date']))
    .y(d => y(d['close']))

const flattenedData = [];

function updateNationPlot(start, end) {
    var bool = false;
    if(new Date(start).getTime() == new Date("Thu Mar 19 2020 00:00:00 GMT+0200 (Ora standard dell’Europa centrale)").getTime() && new Date(end).getTime() == new Date("Sat Jan 30 2021 21:25:18 GMT+0100 (Ora standard dell’Europa centrale)").getTime()) {
        bool = true
        x.domain(d3.extent(flattenedData, d => d['date']))
    }
    else {
        x.domain([new Date(start), new Date(end)])
    }

    var a = {};
    Object.entries(dataPaths).forEach(([key, value]) => {
        //console.log("AO SGHI")
        //console.log(value['date'])
        value.forEach(v => {
            //console.log(v['date'])
            dataInside = new Date(v['date'])
            s = new Date(start)
            //s.setDate(s.getDate() - 1)
            e = new Date(end)

            if(dataInside >= s && dataInside <= e) {
                if(a[key]) a[key].push(v)
                else
                    a[key] = [v]
            }
        })
    })

    var max = 0;
    emptyList = true;
    selectedNations.forEach(elem => {
        if(elem != "")
            emptyList = false;
    })
    if(!emptyList) {
        console.log("Entro in 1")
        selectedNations.forEach(elem => {
            if(a[elem]) {
                a[elem].forEach(v => {
                    if(v["close"] > max)
                        max = v["close"]
                })
            }
        })
        console.log(max)
        if(max > 0) {
            if(sum) {
                initializeSUM();
                if(sumHeight > max) {
                    y.domain([0, sumHeight])
                }
                else
                    y.domain([0, max])

                if(avg) 
                    initializeAVG();
            }
            else if(avg) {
                initializeAVG();
                if(avgHeight > max) {
                    y.domain([0, avgHeight])
                }
                else
                    y.domain([0, max])

            }
                
            else {
                y.domain([0, max])
            }
            
        }
    }
    else if(sum) {
        console.log("Entro in 2")
        initializeSUM();
        y.domain([0, sumHeight])

        if(avg)
            initializeAVG();
    }
    else if(avg) {
        console.log("Entro in 3")
        initializeAVG();
        y.domain([0, avgHeight])
    }
    else {
        y.domain([0, d3.max(flattenedData, d => d['close'])])
    }

    nationsTrendPlot.selectAll("*").remove();
    
    var b = []
    Object.entries(dataPaths).forEach(([key, value]) => {
        value.sort(sortByDate)

        // Define the selectNation method
        const selectNationForTrend = () => selectNation(key)

        //console.log(a)
        // Add the valueline path.
        if(bool) {
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
            .on("click", selectNationForTrend);
        }
        else {
            var a = [];
            //console.log("AO SGHI")
            //console.log(value['date'])
            value.forEach(v => {
                //console.log(v['date'])
                dataInside = new Date(v['date'])
                s = new Date(start)
                //s.setDate(s.getDate() - 10)
                e = new Date(end)

                if(dataInside >= s && dataInside <= e) {
                    a.push(v);

                }
            })

            b.push.apply(b, a)

            nationsTrendPlot.append("path")
                .data([a])
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
        }
    })

    if(sum) {
        console.log("sto per printare la sum function")
        console.log("sumHeight: " + sumHeight)
        console.log("nationSUM: " + nationSUM)
        console.log("sumPath: " + sumPath)
        nationsTrendPlot.append("path")
            .data([sumPath])
            .attr("class", "line-sum")
            .attr("id", `trend-SUM`)
            .attr("d", valueline)
            .on('mouseover', () => {

                document.addEventListener('mousemove', trendMouseEventHandler, true)

                nationTooltip.show("SUM")
            })
            .on('mouseout', () => {
                document.removeEventListener('mousemove', trendMouseEventHandler, true)
                nationTooltip.hide("SUM")
            })
            .on("click", deleteSUM)
    }

    if(avg) {
        console.log("sto per printare la avg function")
        console.log("avgHeight: " + sumHeight)
        console.log("nationAVG: " + nationSUM)
        console.log("avgPath: " + sumPath)
        nationsTrendPlot.append("path")
            .data([avgPath])
            .attr("class", "line-avg")
            .attr("id", `trend-AVG`)
            .attr("d", valueline)
            .on('mouseover', () => {

                document.addEventListener('mousemove', trendMouseEventHandler, true)

                nationTooltip.show("AVG")
            })
            .on('mouseout', () => {
                document.removeEventListener('mousemove', trendMouseEventHandler, true)
                nationTooltip.hide("AVG")
            })
            .on("click", deleteAVG)
    }

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

        // Define the selectNation method
        const selectNationForTrend = () => selectNation(key)

        if(bool) {
            if(selectedNations.includes(key)) {
                nationsTrendPlot.selectAll("dots")
                    .data([value])
                    .enter()
                    .append('g')
                    .style("fill", "black")
                    .selectAll("myPoints2")
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
        }
        else {
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

            if(selectedNations.includes(key)) {
                nationsTrendPlot.selectAll("dots")
                    .data([a])
                    .enter()
                    .append('g')
                    .style("fill", "black")
                    .selectAll("myPoints2")
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
        }
        if(sum) {
            nationsTrendPlot.selectAll("dots")
                .data([sumPath])
                .enter()
                .append('g')
                .style("fill", "black")
                .selectAll("myPoints2")
                .data(function(d){ return d; })
                .enter()
                .append("circle")
                .attr("cx", function(d) { return x(d['date']) } )
                .attr("cy", function(d) { return y(d['close']) } )
                .attr("r", 4)
                .attr("stroke", "white")
                .on("mouseover", (d) => {
                    nationTooltipDot.show(d, 'SUM')
                })
                .on("mouseout", function(d) {
                    nationTooltipDot.hide(d, 'SUM')
                });
        }
        if(avg) {
            nationsTrendPlot.selectAll("dots")
                .data([avgPath])
                .enter()
                .append('g')
                .style("fill", "black")
                .selectAll("myPoints2")
                .data(function(d){ return d; })
                .enter()
                .append("circle")
                .attr("cx", function(d) { return x(d['date']) } )
                .attr("cy", function(d) { return y(d['close']) } )
                .attr("r", 4)
                .attr("stroke", "white")
                .on("mouseover", (d) => {
                    nationTooltipDot.show(d, 'AVG')
                })
                .on("mouseout", function(d) {
                    nationTooltipDot.hide(d, 'AVG')
                });
        }
    })

    // plot loaded notification
    const loaded = new Event('loaded')
    window.dispatchEvent(loaded)
}

let loadedViews = 0

let tokenizedTweets = []

let startInterval
let endInterval
let dataStorage

// loading view
window.addEventListener('loaded', event => {
    loadedViews += 1
    console.log(loadedViews)
    if(loadedViews === 5) {
        console.log('loaded')
        $("#loader").hide()
        $("#loadedPage").show()
    }
}, false)

function updateButtons() {
    count = 0;
    selectedNations.forEach(elem => {
        if(elem != "")
            count = count + 1;
    })

    if(count > 1) {
        $("#button-sum")
          .addClass('mds-button')
          .prop('disabled', false)
          
        $("#button-avg")
          .addClass('mds-button')
          .prop('disabled', false)
    }
    else {
        $("#button-sum")
          .removeClass('mds-button')
          .prop('disabled', true)
        
        $("#button-avg")
          .removeClass('mds-button')
          .prop('disabled', true)
    }
}
var sum = false
var sumHeight = 0
var nationSUM = []
var sumPath = []
var sumButtonClicked = false

function initializeSUM() {
    console.log("initializeSUM() called")
    var ab = []
    if(sumButtonClicked) {
        nationSUM = []
        sumPath = []
    }
    if(nationSUM.length == 0) {
        console.log("dataPaths: " + dataPaths)
        Object.entries(dataPaths).forEach(([key, value]) => {
            if(selectedNations.includes(key)) {
                nationSUM.push(key)
                console.log("value: " + value)
                value.forEach(v => {
                    dataInside = new Date(v['date'])
                    if(dataInside >= x.domain()[0] && dataInside <= x.domain()[1]) {
                        console.log("v: " + v)
                        ab.push(v);
                    }
                })
            }
        })
    }
    else {
        Object.entries(dataPaths).forEach(([key, value]) => {
            if(nationSUM.includes(key)) {
                value.forEach(v => {
                    dataInside = new Date(v['date'])
                    if(dataInside >= x.domain()[0] && dataInside <= x.domain()[1]) {
                        ab.push(v);
                    }
                })
            }
        })
    }

    var variable = {};
    ab.forEach(d => {
        if(variable[d['date'].getMonth()]) {
            variable[d['date'].getMonth()] += d['close']
        }
        else {
            variable[d['date'].getMonth()] = d['close']
        }
    })

    console.log(variable)
    sumPath = []
    Object.entries(variable).forEach(([month, value]) => {
        if(month != 0) {
            insert = {
                date: new Date(2020, month, 1),
                close: value
            }
            sumPath.push(insert)
        }
    })

    if(variable[0]) {
        insert = {
            date: new Date(2021, 0, 1),
            close: variable[0]
        }

        sumPath.push(insert)
    }
    console.log(sumPath)

    sumHeight = 0
    sumPath.forEach(elem => {
        if(elem['close'] > sumHeight)
        sumHeight = elem['close']
    })

    console.log("sumHeight in initializeSUM(): " + sumHeight)
}
// function computeSUM() {
//     if(!sum) {
//         var startX = x.domain()[0]
//         var endX = x.domain()[1]

//         var a = []
//         if(nationSUM.length > 0) {
//             Object.entries(dataPaths).forEach(([key, value]) => {
//                 if(nationSUM.includes(key)) {
//                     //nationSUM.push(key)
//                     value.forEach(v => {
//                         dataInside = new Date(v['date'])
//                         if(dataInside >= startX && dataInside <= endX) {
//                             a.push(v);
//                         }
//                     })
//                 }
//             })
//         }
//         else {
//             Object.entries(dataPaths).forEach(([key, value]) => {
//                 if(selectedNations.includes(key)) {
//                     nationSUM.push(key)
//                     value.forEach(v => {
//                         dataInside = new Date(v['date'])
//                         if(dataInside >= startX && dataInside <= endX) {
//                             a.push(v);
//                         }
//                     })
//                 }
//             })
//         }
        

//         var variable = {}
//         a.forEach(d => {
//             if(variable[d['date'].getMonth()]) {
//                 variable[d['date'].getMonth()] += d['close']
//             }
//             else {
//                 variable[d['date'].getMonth()] = d['close']
//             }
//         })

//         b = [];

//         Object.entries(variable).forEach(([month, value]) => {
//             if(month != 0) {
//                 insert = {
//                     date: new Date(2020, month, 1),
//                     close: value
//                 }
//                 b.push(insert)
//             }
//             // if(insert['date'].getMonth() == 0)
//             //     insert['date'].setFullYear(2021)
//         })

//         if(variable[0]) {
//             insert = {
//                 date: new Date(2021, 0, 1),
//                 close: variable[0]
//             }

//             b.push(insert)
//         } 

//         sumHeight = 0;
//         b.forEach(elem => {
//             if(elem['close'] > sumHeight)
//             sumHeight = elem['close']
//         })

//         sum = true
//         callingFromComputeSUM = true
//         updateNationPlot(startX, endX)
//         callingFromComputeSUM = false

//         console.log(b)
//         nationsTrendPlot.append("path")
//             .data([b])
//             .attr("class", "line-sum")
//             .attr("id", `trend-SUM`)
//             .attr("d", valueline)
//             // .on('mouseover', () => {

//             //     document.addEventListener('mousemove', trendMouseEventHandler, true)

//             //     nationTooltip.show("SUM")
//             // })
//             // .on('mouseout', () => {
//             //     document.removeEventListener('mousemove', trendMouseEventHandler, true)
//             //     nationTooltip.hide("SUM")
//             // })
//             .on("click", deleteSUM)

//         nationsTrendPlot.append("g")
//             .call(d3.axisLeft(y))
//     }
//     else {
//         deleteSUM()
//     }
// }

function deleteSUM() {
    sum = false;
    sumHeight = 0
    nationSUM = []
    sumPath = []
    updateNationPlot(x.domain()[0], x.domain()[1])
}

var avg = false
var avgHeight = 0
var nationAVG = []
var avgPath = []
var avgButtonClicked = false

function initializeAVG() {
    console.log("initializeAVG() called")
    var ab = []
    if(avgButtonClicked) {
        nationAVG = []
        avgPath = []
    }
    if(nationAVG.length == 0) {
        console.log("dataPaths: " + dataPaths)
        Object.entries(dataPaths).forEach(([key, value]) => {
            if(selectedNations.includes(key)) {
                nationAVG.push(key)
                console.log("value: " + value)
                value.forEach(v => {
                    dataInside = new Date(v['date'])
                    if(dataInside >= x.domain()[0] && dataInside <= x.domain()[1]) {
                        console.log("v: " + v)
                        ab.push(v);
                    }
                })
            }
        })
    }
    else {
        Object.entries(dataPaths).forEach(([key, value]) => {
            if(nationAVG.includes(key)) {
                value.forEach(v => {
                    dataInside = new Date(v['date'])
                    if(dataInside >= x.domain()[0] && dataInside <= x.domain()[1]) {
                        ab.push(v);
                    }
                })
            }
        })
    }

    var variable = {};
    ab.forEach(d => {
        if(variable[d['date'].getMonth()]) {
            variable[d['date'].getMonth()] += d['close']
        }
        else {
            variable[d['date'].getMonth()] = d['close']
        }
    })

    var count = 0;
    nationAVG.forEach(elem => {
        if(elem != "")
            count = count + 1;
    })

    console.log(variable)
    avgPath = []
    Object.entries(variable).forEach(([month, value]) => {
        if(month != 0) {
            insert = {
                date: new Date(2020, month, 1),
                close: value/count
            }
            avgPath.push(insert)
        }
    })

    if(variable[0]) {
        insert = {
            date: new Date(2021, 0, 1),
            close: variable[0]/count
        }

        avgPath.push(insert)
    }
    console.log(avgPath)

    avgHeight = 0
    avgPath.forEach(elem => {
        if(elem['close'] > avgHeight)
        avgHeight = elem['close']
    })

    console.log("avgHeight in initializeSUM(): " + avgHeight)
}

function deleteAVG() {
    avg = false;
    avgHeight = 0
    nationAVG = []
    avgPath = []
    updateNationPlot(x.domain()[0], x.domain()[1])
}