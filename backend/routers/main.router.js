/**
 * 
 * main.router.js
 * 
 * This is the main router
 * 
 * @author Roefja
 * @since v1.0.0
 * 
 */

const express = require('express');
const router = express.Router();

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: false,
    index: false,
    maxAge: '1y',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
        res.set("Expires", new Date(Date.now() + 2592000000).toUTCString());
    }
}

module.exports = router;