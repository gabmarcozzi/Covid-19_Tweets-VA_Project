const nationsTrendMargin = { top: 20, right: 50, bottom: 50, left: 50 },
    nationsTrendWidth = d3.select("#nationsTrendPlot").node().getBoundingClientRect().width - nationsTrendMargin.left - nationsTrendMargin.right,
    nationsTrendHeight = d3.select("#nationsTrendPlot").node().getBoundingClientRect().height - nationsTrendMargin.top - nationsTrendMargin.bottom

const timeGrain = 'month'
// parse the date / time
let parseTime
if (timeGrain === 'month') parseTime = d3.timeParse("%b-%Y")
else parseTime = d3.timeParse("%d-%b-%Y")

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
    .append("div")
    .classed("svg-container", true)
    .append("svg")
    //.attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 800 552")
    // Class to make it responsive.
    .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform",
        "translate(" + nationsTrendMargin.left + "," + nationsTrendMargin.top + ")")

// associate tooltips to this plot
nationsTrendPlot.call(nationTooltip)

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

const sortByDate = ((a, b) => {
    return new Date(b['date']) - new Date(a['date']);
});
//#endregion

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
        // Add the valueline path.
        nationsTrendPlot.append("path")
            .data([value])
            .attr("class", "line")
            .attr("id", `trend-${key}`)
            .attr("d", valueline)
            .on('mouseover', () => {
                // Get mouse coordinates
                const x = d3.event.pageX - document.getElementById('nationsTrendPlot').getBoundingClientRect().x + 10
                const y = d3.event.pageX - document.getElementById('nationsTrendPlot').getBoundingClientRect().y + 10
                nationTooltip.show(idToNation[key])
            })
            .on('mouseout', () => {
                nationTooltip.hide(key)
            })
    })

    // Add the X Axis
    nationsTrendPlot.append("g")
        .attr("transform", "translate(0," + nationsTrendHeight + ")")
        .call(d3.axisBottom(x))

    // Add the Y Axis
    nationsTrendPlot.append("g")
        .call(d3.axisLeft(y))

})