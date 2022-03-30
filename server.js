const express = require('express')
const { fstat } = require('fs')
const args = require('minimist')(process.argv.slice(0))
const app = express()
const fs = require('fs')
const jsonfile = require('jsonfile')

var port = args.port || 3000

const server = app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`)  
})

app.get('/covid_deaths', (req, res) => {
    const file = 'deaths_by_sex.json'
    jsonfile.readFile(file, function (err, obj) {
        if (err) {
            console.log(err)
        } else {
            console.log(obj)
        }
    })
})

app.use(function(req, res) {
    res.status(404).send('404 Page Not Found')
})