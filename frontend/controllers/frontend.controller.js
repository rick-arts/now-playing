/**
 * 
 * frontend.controller.js
 * 
 * Frontend controller
 * 
 * @author Roefja
 * @since v1.0.0
 * 
 */

var fs = require("fs");

exports.mainMW = (req, res, next) => {
    host = req.get("host");
    req_baseUrl = req.baseUrl;

    


    next();
}

exports.serve404 = (req, res, next) => res.render('index')