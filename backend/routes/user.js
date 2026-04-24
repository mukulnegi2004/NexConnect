const express = require("express");

const router = express.Router();
const userController = require("../controllers/user");
const wrapAsync = require("../utils/wrapAsync");

router.route("/register")
    .post(wrapAsync(userController.register));






module.exports = router;