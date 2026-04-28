const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const wrapAsync = require("../utils/wrapAsync");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage});

router.route("/update_profile_picture")
    .post(upload.single("profile_picture"), wrapAsync(userController.uploadProfilePicture))

router.route("/register")
    .post(wrapAsync(userController.register));

router.route("/login")
    .post(wrapAsync(userController.login));






module.exports = router;