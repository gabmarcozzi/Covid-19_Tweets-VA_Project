// set the dimensions and margins of the graph
const wordCloudMargin = {top: 10, right: 50, bottom: 50, left: 10},
    wordCloudwidth = d3.select("#wordcloud").node().getBoundingClientRect().width - margin.left - margin.right,
    wordCloudheight = d3.select("#wordcloud").node().getBoundingClientRect().height - margin.top - margin.bottom

const updateWordCloud = (data, start = null, end = null, dispatchLoaded = true) => {

    const plot = document.getElementById("wordCloudPlot")

    if (plot) plot.remove()

    // append the svg object to the body of the page
    const wordCloudSvg = d3.select("#wordcloud").append("svg")
        .attr("id", "wordCloudPlot")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 360 285")
        .append("g")
        .attr("transform",
            "translate(" + wordCloudMargin.left + "," + wordCloudMargin.top + ")")


    const wordFrequencies = {}
    // Empty global tokenized tweets list
    const tokenizedTweets = []

    if (start && end) {
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
            } else {
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

    topTenWordFreqs.forEach((wf, i) => myWords[wf[0]] = `${(i + 1) * 6}`)

    let colorCounter = 0
    const colors = ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30']
    const orientations = [90,0]

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    const layout = d3.layout.cloud()
        .size([wordCloudwidth, wordCloudheight])
        .words(Object.entries(myWords).map(([word, fontSize]) => {
            const item = {text: word, size: fontSize, color: colors[colorCounter]}
            colorCounter += 1
            return item
        }))
        .padding(5)        //space between words
        .rotate((_, i) => orientations[i % orientations.length])
        .fontSize(d => d.size)      // font size of words
        .on("end", (words) => {

            var update = wordCloudSvg
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)


            var enter = update
                .enter().append("text")
                .style("font-size", d => {
                    return d.size
                })
                .style("fill", d => d.color)
                .attr("text-anchor", "middle")
                .style("font-family", "Impact")
                .text(d => d.text)

            update
                .merge(enter)
                .transition()
                .duration(1000)
                .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
        })

    // Draw the wordcloud
    layout.start()

    if (dispatchLoaded) {
        // plot loaded notification
        const loaded = new Event('loaded')
        window.dispatchEvent(loaded)
    }
}