const express = require('express')
const { fstat } = require('fs')
const args = require('minimist')(process.argv.slice(0))
const app = express()
const fs = require('fs')
const jsonfile = require('jsonfile')

const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

var port = args.port || 3000

const server = app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`)  
})

app.get('/covid_deaths/', (req, res) => {

    $.ajax({ // fetches dataset from the CDC website and saves it as a json file

        url: "https://data.cdc.gov/resource/9bhg-hcku.json",
        type: "GET",
        data: {
          "$limit" : 100000,
          "$$app_token" : "LkodRSqKWrJ9i691KYiUPv9oG"
        }
    }).done(function(data) {
      console.log("Retrieved " + data.length + " records from the dataset!");

      jsonfile.writeFile('dataset.json', data)
    });

    res.status(200).send("Successfully retrieved dataset!")
})

app.use(function(req, res) {
    res.status(404).send('404 Page Not Found')
})