// Start to set the scatterplot
var mdsMargin = { top: 10, right: 0, bottom: 10, left: 50 },
  mdsWidth = d3.select("#mds").node().getBoundingClientRect().width - mdsMargin.left - mdsMargin.right,
  mdsHeight = d3.select("#mds").node().getBoundingClientRect().height - mdsMargin.top - mdsMargin.bottom

// append the svg object to the body of the page
var mdsSvg = d3.select("#mds")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("viewBox", "0 0 460 428")
  .append("g")
  .attr("transform",
    "translate(" + mdsMargin.left + "," + mdsMargin.top + ")")

d3.csv("http://localhost:3000/covidTweetsDataset.csv", (error, data) => {
  if (error) throw error

  // Add X axis
  var mdsX = d3.scaleLinear()
    .domain([-0.5, 0.5])
    .range([0, mdsWidth]);

  // Add Y axis
  var mdsY = d3.scaleLinear()
    .domain([-0.5, 0.5])
    .range([mdsHeight, 0])

  mdsSvg.append("g")
  .attr("transform", "translate(" + mdsX(0) + ",0)")
    .call(d3.axisLeft(mdsY))
  mdsSvg.append("g")
    .attr("transform", "translate(0," + mdsY(0) + ")")
    .call(d3.axisBottom(mdsX))

  const tweetsMatrix = data.map(d => {
    const tokenizedTweet = d.text.split(' ')
    // For each entry create a vector containing the number of retweets, the user's followers number and the number of words of each tweet
    return [parseInt(d.retweet_count), parseInt(d.user_friends_count), tokenizedTweet.length, moment(d.created_at).diff(moment('01-03-2020', 'DD-MM-YYYY'), 'day')]
  })

  const cutMatrix = tweetsMatrix.slice(0, 5000)

  console.log(cutMatrix)

  const druidMDS = new druid.MDS(cutMatrix)

  const druidReducedMatrix = druidMDS.transform() 

  console.log(druidReducedMatrix)

  mdsSvg.append('g')
        .selectAll("dot")
        .data(druidReducedMatrix)
        .enter()
        .append("circle")
        .attr("cx", d => mdsX(d[0]))
        .attr("cy", d => mdsY(d[1]))
        .attr("r", 2)
        .style("fill", "blue")
})