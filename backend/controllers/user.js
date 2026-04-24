const ExpressError = require("../utils/ExpressError");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const ProfileModel = require("../models/profile");



const register = async (req, res, next) => {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
        throw new ExpressError(400, "all fields are required");
    }

    const user = await UserModel.findOne({
        $or : [{email}, {username}]                              //match if email matches OR username matches
    })
    if(user){
        throw new ExpressError(400, "user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        name,
        email, 
        password: hashedPassword,
        username
    })
    await newUser.save();

    const profile = new ProfileModel({
        userId: newUser._id
    })
    await profile.save();

    return res.status(201).json({message : "user created"});
}



module.exports = { register };