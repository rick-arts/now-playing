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
const func = require("../../lib/main.func")

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

router.use("", func.mainMW);

router.use('/assets', express.static('frontend/assets', options))

// Index page
router.get('/', (req, res) => {
    let data = {};

    new Promise((resolve, reject) => {
        LAST_FM_CONTROLLER.getLatestSong(response => {
            resolve({ ...data, current_track: response });
        })
    })
        .then((data) => {
            return new Promise((resolve, reject) => {
                LAST_FM_CONTROLLER.getUserInfo(response => {
                    resolve({ ...data, ...response });
                })
            })

        })

        .then((data) => {
            if (data.current_track == undefined) data.current_track = {};
            res.render('index', { page: "index", ...data })
        })
})

router.use((req, res) => res.redirect('/'));

module.exports = router;