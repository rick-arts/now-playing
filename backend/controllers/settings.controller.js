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

const settings = {}

exports.loadDefaultSettings = () => {
	if (!fs.existsSync('uploads/settings.json')) return settings = {};
	settings = JSON.parse(fs.readFileSync('uploads/settings.json', 'utf8'));
}

exports.getSettings = () => { return settings };

exports.getSetting = (key) => {
	console.log({key, value: settings[key]})
	return settings[key];
}

exports.setSetting = (key, value) => {
	settings[key] = value;
}