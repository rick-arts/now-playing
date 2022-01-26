/**
 * 
 * Settings.controller.js
 * 
 * Settings controller
 * 
 * @author Roefja
 * @since v1.0.0
 * 
 */

const fs = require("fs");

const controller = this;

exports.getSettings = () => {
	if (!fs.existsSync('uploads/settings.json')) return {};
	return JSON.parse(fs.readFileSync('uploads/settings.json', 'utf8'));
}

exports.getSetting = (key) => {
	return controller.getSettings()[key];
}