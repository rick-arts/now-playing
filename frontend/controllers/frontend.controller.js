/**
 * 
 * frontend.controller.js
 * 
 * Frontend controller
 * 
 * @author Rick Arts
 * @since v1.0.0
 * 
 */

var fs = require("fs");
exports.serve404 = (req, res, next) => res.render('index')