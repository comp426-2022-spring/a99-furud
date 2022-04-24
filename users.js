"use strict";

const database = require('better-sqlite3')
const db = new database('./data/db/users.db')

function check_user(user, pass) {
    let stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='users';`)
    let row = stmt.get();

    if (row == undefined) {
        const create_table = `CREATE TABLE users (
            userid INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR,
            password VARCHAR,
            email VARCHAR
        );`

        db.exec(create_table);
    }

    let sql = db.prepare(`SELECT * FROM users WHERE username='${user}' and password='${pass}';`).get()
    if (sql != undefined) {
        return true;
    } else {
        return false;
    }
}

module.exports = {check_user}