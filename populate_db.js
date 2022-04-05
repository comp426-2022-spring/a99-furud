'use strict';

const Database = require('better-sqlite3');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

const db = new Database('./database.db')

const apis = {
    'covid_deaths_by_sex' : 'https://data.cdc.gov/resource/9bhg-hcku.json',
    'covid_deaths_over_time' : 'https://data.cdc.gov/resource/9mfq-cb36.json',
    'covid_deaths_by_county' : 'https://data.cdc.gov/resource/kn79-hsxy.json'
}

const tables_format = {
    'covid_deaths_by_sex' : `
            id INTEGER PRIMARY KEY AUTOINCREMENT,
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
        `,

    'covid_deaths_over_time' : `
            id INTEGER PRIMARY KEY AUTOINCREMENT,
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
        `
}

const update_column = {
    'covid_deaths_by_sex' : 'end_date',
    'covid_deaths_over_time' : 'sub_date',
    'covid_deaths_by_county' : null 
}

// create_table('covid_deaths_by_sex')

function create_table(tbl_name) {

    // console.log(format)

    let stmt = db.prepare(`
        SELECT name
        FROM sqlite_master 
        WHERE type='table' AND name='${tbl_name}';
    `)

    if (stmt.get() == undefined) { // table doesn't exist

        console.log(`creating table '${tbl_name}'...`)

        stmt = db.prepare(`
            CREATE TABLE ${tbl_name} (
                ${format}
            );
        `)

        stmt.run()
        console.log(`'${tbl_name}' has been created`)

    } else {
        console.log(`table '${tbl_name}' already exists, regenerating its contents...`)
        db.exec(db.prepare(`DELETE FROM ${tbl_name};`))
    }

    var format = tables_format[tbl_name]

    if (format == undefined) {
        console.log('table format not found, please create new entry in "populate_db.js"')
        return
    }

    // console.log(`
    //     CREATE TABLE ${tbl_name} (
    //         ${format}
    //     );
    // `)

    $.ajax({ // fetches dataset from the CDC website
        url: apis[tbl_name],
        type: "GET",
        data: {
        "$limit" : 100000,
        "$$app_token" : "LkodRSqKWrJ9i691KYiUPv9oG"
        }
    }).done(function(data) {
        console.log("Retrieved " + data.length + " records from the dataset");
        write_to_table(tbl_name, data);
    })

}


function update_table(tbl_name) {

    let stmt = deaths_over_time_db.prepare(`
        SELECT name
        FROM sqlite_master 
        WHERE type='table' AND name='${tbl_name}';
    `)
    
    if (stmt.get() == undefined) {
        console.log(`table ${tbl_name} does not exist`)
        return create_table(tbl_name)
    }

    var format = tables_format(tbl_name)

    if (format == undefined) {
        console.log('table format not found, please create new entry in "populate_db.js"')
        return
    }

    stmt = deaths_over_time_db.prepare(`
        SELECT MAX(sub_date) AS latest
        FROM ${tbl_name};
    `).get()
    
    let latest_date = stmt['latest']
    console.log('fetching rows later than ' + latest_date)
    
    $.ajax({ // fetches dataset from the CDC website
        url: `${apis[tbl_name]}?$where=${update_column[tbl_name]}>${latest_date}`,
        type: "GET",
        data: {
        "$limit" : 100000,
        "$$app_token" : "LkodRSqKWrJ9i691KYiUPv9oG"
        }
    }).done(function(data) {
        console.log("Retrieved " + data.length + " records from the dataset");
        write_to_table(tbl_name, data);
    })
}


function write_to_table(tbl_name, dataset) {

    let deaths_format = tables_format[tbl_name].split(',')

    deaths_format.array.forEach((element, index) => { // get the table's column names 
        deaths_format[index] = element.split(" ")[0]
    });

    stmt = deaths_db.prepare(`
        INSERT INTO ${tbl_name} (
            ${deaths_format.join()}
        )
        VALUES (${'?,'.repeat(deaths_format.length).slice(0, -1)});
    `)

    // insert dataset into table row by row        
    for(i = 0; i < dataset.length; i++) {
        deaths_arr = []

        for(var j = 0; j < deaths_format.length; j++) {
            if(data[i].hasOwnProperty(deaths_format[j])) {
                deaths_arr.push(data[i][deaths_format[j]])
            } else {
                deaths_arr.push('')
            }
        }
        stmt.run(deaths_arr)
    }

}

module.exports = {create_table, update_table, write_to_table}