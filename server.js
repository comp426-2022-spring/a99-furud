const { response } = require('express')
const express = require('express')
const { fstat } = require('fs')
const args = require('minimist')(process.argv.slice(0))
const app = express()
const fs = require('fs')
const jsonfile = require('jsonfile')
let XMLHttpRequest = require('xhr2')
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
let request = new XMLHttpRequest()

var port = args.port || 3000

const server = app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`)  
})

app.get('/covid_deaths', (req, res) => {
    $.ajax({
        url: 'https://data.cdc.gov/resource/9bhg-hcku.json',
        type: 'GET',
        data: {
            "$limit": 500,
            "$app_token": 'LkodRSqKWrJ9i691KYiUPv9oG'
        }
    }).done(function(data) {
        alert("retrieved " + data.length + " records from dataset")
        console.log(data.length)
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