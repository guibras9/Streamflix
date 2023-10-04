const express = require('express');
const router = express.Router();
const user = require("../controllers/user.controller");

router.post('/login', user.authenticate);
router.post('/register', user.register);


router.get("/login", async (req, res) => {
   console.log("Request for login received")
   res.render("pages/login");
});

router.get("/register", async (req, res) => {
   console.log("Request for register received")
   res.render("pages/register");
});

router.get("/user/:id", user.findById);
router.get("/user/:id/delete", user.delete,);

router.get("/user/:id/update", user.update);
router.post("/user/:id/update", user.update);

module.exports = router;