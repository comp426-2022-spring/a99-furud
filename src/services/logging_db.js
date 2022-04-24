"use strict";

const Database = require('better-sqlite3');
const db = new Database('./data/log/log.db');
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`);

let row = stmt.get();

// Check if table exists
if (row === undefined) {

    console.log('initializing logging database...');

    const sqlInit = `
        CREATE TABLE accesslog (
            remoteaddr TEXT,
            remoteuser TEXT,
            time INTEGER PRIMARY KEY,
            method TEXT,
            url TEXT,
            protocol TEXT,
            httpversion TEXT,
            status INTEGER,
            referer TEXT,
            useragent TEXT     
        );`

    db.exec(sqlInit);

    console.log('logging database has been initialized');

} else {
    console.log('logging database exists.')
}

module.exports = db