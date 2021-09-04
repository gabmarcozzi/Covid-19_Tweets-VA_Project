// set the dimensions and margins of the graph
const wordCloudMargin = { top: 10, right: 50, bottom: 50, left: 10 },
  wordCloudwidth = d3.select("#wordcloud").node().getBoundingClientRect().width - margin.left - margin.right,
  wordCloudheight = d3.select("#wordcloud").node().getBoundingClientRect().height - margin.top - margin.bottom

  const updateWordCloud = (data, start = null, end = null, dispatchLoaded = true) => {

    const plot = document.getElementById("wordCloudPlot")

    if(plot) plot.remove()

    // append the svg object to the body of the page
    const wordCloudSvg = d3.select("#wordcloud").append("svg")
        .attr("id", "wordCloudPlot")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 460 428")
        .append("g")
        .attr("transform",
            "translate(" + wordCloudMargin.left + "," + wordCloudMargin.top + ")")


    const wordFrequencies = {}
    // Empty global tokenized tweets list
    tokenizedTweets = []

    if(start && end) {
      data = data.filter(d => moment(d.created_at).isBefore(moment(end)) && moment(d.created_at).isAfter(moment(start)))
    }

    data.forEach(d => {
      let tweet = d.text

      // remove punctuation
      tweet = tweet.replace(/[.,\/@#!$%\^&\*;:{}=\-_`~()]/g, "")

      // tokenize the sentence
      const tokenizedTweet = tweet.split(' ')

      tokenizedTweets.push(tokenizedTweet)

      tokenizedTweet.forEach(word => {
        // filter empty string and stop words
        if (word === '' || stopWords[word.toLowerCase()]) return

        if (wordFrequencies[`${word.toLowerCase()}`]) {
          wordFrequencies[`${word.toLowerCase()}`] += 1
        }
        else {
          wordFrequencies[`${word.toLowerCase()}`] = 1
        }
      })
    })

    const topTenWordFreqs = [['', 0], ['', 0], ['', 0], ['', 0], ['', 0], ['', 0], ['', 0], ['', 0], ['', 0], ['', 0]]

    Object.entries(wordFrequencies).forEach(([word, frequency]) => {
      for (let i = 0; i < topTenWordFreqs.length; i++) {
        if (frequency > topTenWordFreqs[i][1]) {
          topTenWordFreqs[i] = [word, frequency]
          break
        }
      }

      // mantain the top ten array sorted
      topTenWordFreqs.sort((a, b) => a[1] - b[1])

    })

    // List of words
    const myWords = {}

    topTenWordFreqs.forEach((wf, i) => myWords[wf[0]] = `${(i + 1) * 7}`)

    let colorCounter = 0
    const colors = ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    const layout = d3.layout.cloud()
        .size([wordCloudwidth, wordCloudheight])
        .words(Object.entries(myWords).map(([word, fontSize]) => {
          const item = { text: word, size: fontSize, color: colors[colorCounter] }
          colorCounter += 1
          return item
        }))
        .padding(5)        //space between words
        .rotate(() => ~~(Math.random() * 2) * 90)
        .fontSize(d => d.size)      // font size of words
        .on("end", (words) => {

          wordCloudSvg
              .append("g")
              .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
              .selectAll("text")
              .data(words)
              .enter().append("text")
              .style("font-size", d => { return d.size })
              .style("fill", d => d.color)
              .attr("text-anchor", "middle")
              .style("font-family", "Impact")
              .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
              .text(d => d.text)
        })

    // Draw the wordcloud
    layout.start()

    if(dispatchLoaded) {
      // plot loaded notification
      const loaded = new Event('loaded')
      window.dispatchEvent(loaded)
    }
  }

$("#reload-button-wc").click(() => {
  $("#loader").show()
  $("#loadedPage").hide()

  $("#reload-button-wc")
      .removeClass('mds-button')
      .prop('disabled',true)

  setTimeout(() => {
    updateWordCloud(dataStorage, startInterval, endInterval, false)

    $("#loader").hide()
    $("#loadedPage").show()
  },500)
})