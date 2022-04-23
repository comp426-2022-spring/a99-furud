"use strict";

const db = require('../services/logging_db.js');

function logger(req, res, next) {
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }

    const stmt = db.prepare(`
           INSERT INTO accesslog
           VALUES (
               @remoteaddr,
               @remoteuser,
               @time,
               @method,
               @url,
               @protocol,
               @httpversion,
               @status,
               @referer,
               @useragent
           )
       `)

    stmt.run(logdata)
    next()
}

module.exports = logger

