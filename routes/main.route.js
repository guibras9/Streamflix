const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
   console.log("Request for index received")
   res.render("pages/index");
});

router.get("/about", async (req, res) => {
   console.log("Request for about received")
   res.render("pages/about");
});

module.exports = router;