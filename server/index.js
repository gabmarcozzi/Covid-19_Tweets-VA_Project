const express = require('express')
const {readFileSync, existsSync} = require('fs')
const {join} = require('path')
const app = express()
const port = 3000

const BASE_PATH = './filesDir'

app.listen(port, () => {
    console.log(`Covid19 tweets server listening at http://localhost:${port}`)
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Endpoint to get files from the current filesystem
app.get('/:filename', (req, res, next) => {
    const filename =  req.params.filename
    if (existsSync(join(BASE_PATH, filename))) {
        console.log(`${filename} sent to frontend`)
        const file = readFileSync(join(BASE_PATH, filename))
        return res.send(file)
    } else {
        console.log('ERROR')
        return
    }
})