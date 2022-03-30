const { response } = require('express')
const express = require('express')
const { fstat } = require('fs')
const args = require('minimist')(process.argv.slice(0))
const app = express()
const fs = require('fs')
const jsonfile = require('jsonfile')
let XMLHttpRequest = require('xhr2')
let request = new XMLHttpRequest()

var port = args.port || 3000

const server = app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`)  
})

app.get('/covid_deaths', (req, res) => {
    fetch('https://data.cdc.gov/resource/9bhg-hcku.json')
        .then(response => {
            return response.json()
        })
        .then(users => {
            console.log(users)
        })
    // jsonfile.readFile(file, function (err, obj) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log(obj)
    //     }
    // })
})

app.use(function(req, res) {
    res.status(404).send('404 Page Not Found')
})