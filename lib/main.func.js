/**
 *
 * This is our main functions library
 *
 * @author Roefja
 * @since v0.0.1
 *
 */

 const crypto = require("crypto");
 const md5 = require("md5");
 const fs = require("fs");
 let getRawBody = require("raw-body");
 exports.deepcopy = require("deepcopy");
 const func = this;
 const moment = require("moment");
 
 /**
	* Generates a random string
	*
	* @param {*} length
	* @param {*} mode A crypto mode, for the string to display
	*/
 exports.rand_string = (length = 10, mode = "hex") => {
	 return crypto.randomBytes(length).toString(mode);
 };
 
 /**
	* Throws an message to the user
	*/
 exports.throwMessage = (res, status = { success: null, code: null, message: null }, http_response_code = null) => {
	 if (typeof status == 'string') status = { message: status };
	 if (status.success === null || status.success === undefined) status.success = false;
	 if (http_response_code === null) http_response_code = status.success ? 200 : 400;
	 if (status.code === null || status.code === undefined) status.code = status.success ? "success" : "unknown_error";
	 if (status.message === null || status.message === undefined) status.message = status.code;
	 res.status(http_response_code).send({ ...status });
 };
 
 exports.throwInvalidAuthMessage = (res) => {
	 this.throwMessage(res, { message: __uc("API call made without the proper authentication"), code: "invalid_auth", success: false }, 401);
 }
 
 /**
	*
	* Checks if the body is empty, used for checking the express request body
	*
	* @param {*} body the body (array) to check
	*/
 exports.checkEmptyBody = (body) => {
	 return body.constructor === Object && Object.keys(body).length === 0;
 };
 
 /**
	*
	* This function tries to parse a valid JSON string. If it is not a valid JSON string, it will return the input
	*
	* @param {*} string A (valid) JSON string
	*/
 exports.parseValidJSON = (string) => {
	 if (typeof string !== "string") return string;
	 try {
		 return JSON.parse(string);
	 } catch (error) {
		 return string;
	 }
 };
 
 exports.md5 = (string) => { return md5(string); };
 
 /**
	*
	* @param {*} string Strong to uppercase the first character of
	* @returns
	*/
 exports.ucfirst = (string) => { return string.charAt(0).toUpperCase() + string.slice(1); };
 
 /**
	*
	* @param {*} file The file you want to lookup
	* @param {*} result The result. Will return true if the file exists and will return false if not
	*/
 exports.fileExists = (file, result) => {
	 fs.access("./" + file, fs.F_OK, (err) => {
		 result(!err);
	 });
 };
 
 exports.sortArrayByValue = (array) => {
	 return Object.fromEntries(Object.entries(array).sort(([, a], [, b]) => a.toLowerCase().localeCompare(b.toLowerCase())));
 };
 
 exports.sortArrayByKey = (array) => {
	 return Object.fromEntries(Object.entries(array).sort(([a], [b]) => a.toLowerCase().localeCompare(b.toLowerCase())));
 };
 
 exports.sortObjectsByProperty = (objects, property = 'name') => {
	 return objects.sort((a, b) => {
		 a = a[property];
		 b = b[property];
 
		 if (!isNaN(a)) a = Number(a);
		 else a = a.toLowerCase();
 
		 if (!isNaN(b)) b = Number(b);
		 else b = b.toLowerCase();
 
		 if(!isNaN(a)) return a-b;
		 a.localeCompare(b)
	 })
 };
 
 exports.arrayIdToNames = (array) => {
	 let sorted = {};
	 for ([id, info] of Object.entries(array)) sorted[info.name] = info;
	 return this.sortArrayByKey(sorted);
 };
 
 exports.numSort = (a, b) => { return a - b; };
 
 exports.expressRawBody = (req, res, next) => {
	 if (Object.entries(req.body).length === 0) {
 
		 if (req.headers["content-length"] == 0) return next();
 
		 getRawBody(
			 req,
			 {
				 length: req.headers["content-length"],
				 expected: req.headers["content-length"],
				 limit: "50mb",
				 encoding: "utf-8",
			 },
			 function (err, string) {
				 if (err) next();
				 req.body = req.text = func.parseValidJSON(string);
				 next();
			 }
		 )
	 }
	 else return next();
 };
 
 exports.encodeDataToURL = (data) => {
	 return Object
		 .keys(data)
		 .map(value => `${value}=${encodeURIComponent(data[value])}`)
		 .join('&');
 }
 
 exports.parseBoolean = (bool, default_response = null) => {
	 if (bool === true || bool == '1') return true;
	 else if (bool === false || bool == '0') return false;
	 return default_response || false;
 }
 
 exports.number_format = (number, decimals = 2) => {
	 var formatted = number.toFixed(decimals).replace(".", ",");
	 return formatted;
 };
 
 exports.mainMW = (req, res, next) => {
	 COPYRIGHT_YEAR = moment().format("YYYY");
	 res.set("x-powered-by", "Roefja");
	 if (process.env.DEVELOPMENT) {
		 VERSION = moment().format("YYYYMMDDHHmmss");
		 DEVELOPMENT = true
	 }
	 next();
 }
 
 exports.serve404PugMW = (req, res) => {
	 res.status(404).render("templates/lib/error-page", {
		 auth_user: req.auth_user || {},
		 auth_tenant: req.auth_tenant || {},
		 error_code: 404,
		 page: 404,
		 show_description: true,
		 icon: 'unlink'
	 });
 }