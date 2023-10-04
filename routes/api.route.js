const express = require('express');
const router = express.Router();
const api = require("../controllers/api.controller");
const user = require("../controllers/user.controller");


router.get("/home", function(req, res, next) {
    console.log(user.auth),
    res.locals.auth = user.auth;
    next()
}, api.trend);

router.get("/series", function(req, res, next) {
    console.log(user.auth),
    res.locals.auth = user.auth;
    next()
}, api.series);
router.post("/series", api.searchseries);

router.get("/movies", function(req, res, next) {
    console.log(user.auth),
    res.locals.auth = user.auth;
    next()
},api.movies);

router.post("/movies", api.searchmovies);

module.exports = router;