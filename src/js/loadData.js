
d3.csv("http://localhost:3000/covidTweetsDataset.csv", (error, data) => {
    if (error) throw error

    dataStorage = data

    updateWordCloud(data)
    updateMDS(data)

    // at the start of the webapp select all the nations that are in selectedNation
    selectedNations.forEach((nation, i) => {
        const selectionColor = selectionColors[i%selectionColors.length]
        d3.select(`#trend-${nation}`)
            .style("stroke", `${selectionColor}`)

        d3.select(`#point-${nation}`)
            .style("fill", `${selectionColor}`)
            .raise()

        d3.select(`#map-${nation}`)
            .style("stroke", `${selectionColor}`)
            .style("stroke-width", 3)
    })
})