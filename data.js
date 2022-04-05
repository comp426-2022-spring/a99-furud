const database = require('better-sqlite3')

function getData(dbase, cols=[], paras=[]) {
    db = new database(dbase + ".db");
    sql = "SELECT ";
    if(cols.length == 0) {
        sql = sql + "*";
    } else {
        sql = sql + cols.toString();
    }
    sql = sql + " FROM " + dbase;
    if(paras.length > 0) {
        sql = sql + " WHERE " + paras.toString();
    }
    sql = sql + ";";
    console.log(sql)
    ret = db.prepare(sql).all();
    return ret;
}

module.exports = {getData}