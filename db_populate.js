const database = require('better-sqlite3')
'use strict';
const requests = require('requests')
const deaths_db = new database('covid_deaths.db')
const deaths_over_time_db = new database('covid_deaths_over_time.db')
const { JSDOM } = require( "jsdom" );
const { json } = require('express/lib/response');
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

deaths_format = ['data_as_of','start_date','end_date','group','year','month','state','sex','age_group','covid_19_deaths','total_deaths']
deaths_ot_format = ['sub_date','state','tot_cases','conf_cases','prob_cases','new_case','pnew_case','tot_death','conf_death','new_death','created_at']

function covid_deaths_db() {
    let stmt = deaths_db.prepare(`SELECT name FROM sqlite_master where type='table' and name='covid_deaths';`)
    let row = stmt.get()
    if(row != undefined) {
        sql = `DROP TABLE covid_deaths`
        deaths_db.exec(sql)
    }
    sql = `CREATE TABLE covid_deaths (
        id INTEGER PRIMARY KEY,
        date_as_of DATETIME, 
        start_date DATETIME,
        end_date DATETIME,
        group_by VARCHAR,
        year VARCHAR,
        month VARCHAR,
        state VARCHAR,
        sex VARCHAR,
        age_group VARCHAR,
        covid_deaths INTEGER,
        total_deaths INTEGER
    );`
    deaths_db.exec(sql)
    console.log('Creating database...')
    $.ajax({ // fetches dataset from the CDC website and saves it as a json file
        url: "https://data.cdc.gov/resource/9bhg-hcku.json",
        type: "GET",
        data: {
        "$limit" : 100000,
        "$$app_token" : "LkodRSqKWrJ9i691KYiUPv9oG"
        }
    }).done(function(data) {
    console.log("Retrieved " + data.length + " records from the dataset!");
    for(i = 0; i < data.length; i++) {
        deaths_arr = []
        for(j=0; j < deaths_format.length; j++) {
            if(data[i].hasOwnProperty(deaths_format[j])) {
                deaths_arr.push(data[i][deaths_format[j]])
            } else {
                deaths_arr.push('')
            }
        }
        deaths_db.prepare(`INSERT INTO covid_deaths (date_as_of,start_date,end_date,group_by,year,month,state,sex,age_group,covid_deaths,total_deaths) VALUES (?,?,?,?,?,?,?,?,?,?,?);`).run(deaths_arr)
    }
    console.log('Done')
    }).fail(function(data) {
        console.log('error')
    });
}

function covid_deaths_over_time() {
    let stmt = deaths_over_time_db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='covid_deaths_over_time';`)
    let row = stmt.get()
    if (row == undefined) {
        sql = `CREATE TABLE covid_deaths_over_time (
            id PRIMARY KEY, 
            sub_date DATETIME,
            state VARCHAR,
            tot_cases INTEGER,
            conf_cases INTEGER,
            prob_cases INTEGER,
            new_case INTEGER,
            pnew_case INTEGER,
            tot_death INTEGER,
            conf_death INTEGER,
            new_death INTEGER,
            created_at DATETIME
        )`
        deaths_over_time_db.exec(sql)

        $.ajax({
            url: "https://data.cdc.gov/resource/9mfq-cb36.json",
            type: "GET",
            data: {
                "$limit" : 100000,
                "$$app_token" : "LkodRSqKWrJ9i691KYiUPv9oG"
            }
        }).done(function(data) {
            console.log("Retrieved " + data.length + " records from the dataset!");
            for(i = 0; i < data.length; i++) {
                deaths_arr = []
                for(j=0; j < deaths_format.length; j++) {
                    if(data[i].hasOwnProperty(deaths_format[j])) {
                        deaths_arr.push(data[i][deaths_format[j]])
                    } else {
                        deaths_arr.push('')
                    }
                }
                deaths_db.prepare(`INSERT INTO covid_deaths_over_time ('date','state','tot_cases','conf_cases','prob_cases','new_case','pnew_case','tot_death','conf_death','new_death','created_at') VALUES (?,?,?,?,?,?,?,?,?,?,?);`).run(deaths_arr)
            }
            console.log('Done')
    });
    } else {

        stmt = deaths_over_time_db.prepare('SELECT sub_date FROM covid_deaths_over_time ORDER BY sub_date LIMIT 1')
        last_date = stmt.get()
        $.ajax({
            //need to edit the api url to filter results after submission_date
            //if we cannot figure out how to filter results by url, we can brute force and make a call for each day since last import into database
            url: "https://data.cdc.gov/resource/9mfq-cb36.json?submission_date=" + last_date, 
            type: "GET",
            data: {
                "$limit" : 100000,
                "$$app_token" : "LkodRSqKWrJ9i691KYiUPv9oG"
            }
        }).done(function(data) {
            console.log("Retrieved " + data.length + " records from the dataset!");
            for(i = 0; i < data.length; i++) {
                deaths_arr = []
                for(j=0; j < deaths_format.length; j++) {
                    if(data[i].hasOwnProperty(deaths_format[j])) {
                        deaths_arr.push(data[i][deaths_format[j]])
                    } else {
                        deaths_arr.push('')
                    }
                }
                deaths_db.prepare(`INSERT INTO covid_deaths_over_time ('date','state','tot_cases','conf_cases','prob_cases','new_case','pnew_case','tot_death','conf_death','new_death','created_at') VALUES (?,?,?,?,?,?,?,?,?,?,?);`).run(deaths_arr)
            }
            console.log('Done')
    });
}

module.exports = {covid_deaths_db, covid_deaths_over_time}