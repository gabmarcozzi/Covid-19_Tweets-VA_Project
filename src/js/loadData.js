
d3.csv("http://localhost:3000/covidTweetsDataset.csv", (error, data) => {
    if (error) throw error

    dataStorage = data

    updateWordCloud(data)
    updateMDS(data)
})