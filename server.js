const express = require('express')
const args = require('minimist')(process.argv.slice(0))
const app = express()
const fs = require('fs')
const db_populate = require('./db_populate.js')
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const get_data = require('./data.js')

var port = args.port || 3000

const server = app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`)  
})

app.get('/covid_deaths/', (req, res) => {
    res.status(200).send('OK')
})

app.get('/db_populate.js', (req, res) => {
    res.status(200).send(db_populate.covid_deaths_db())
})

app.get('/update/', (req, res) => {
    res.status(200).send(db_populate.update_covid_deaths())
})

app.get('/get_data/', (req, res) => {
    res.status(200).send(get_data.getData("covid_deaths_over_time"))
    
})

app.use(function(req, res) {
    res.status(404).send('404 Page Not Found')
})