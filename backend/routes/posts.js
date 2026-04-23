const express = require("express");

const router = express.Router();
const postsController = require("../controllers/posts");
const wrapAsync = require("../utils/wrapAsync");

router.route("/")
    .get(postsController.runningCheck);






module.exports = router;