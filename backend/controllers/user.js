const ExpressError = require("../utils/ExpressError");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const ProfileModel = require("../models/profile");
const crypto = require("crypto");



const register = async (req, res) => {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
        throw new ExpressError(400, "all fields are required");
    }

    const user = await UserModel.findOne({
        $or: [{ email }, { username }]                              //check if email matches OR username matches already existed
    })
    if (user) {
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

    return res.status(201).json({ message: "user created" });
}



const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ExpressError(400, "all fields are required");
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
        throw new ExpressError(404, "user does not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ExpressError(400, "invalid credentials");
    }

    const token = crypto.randomBytes(32).toString("hex");

    await UserModel.findByIdAndUpdate(user._id, { $set: { token: token } }, { new: true });

    return res.json({ token });

}


const uploadProfilePicture = async (req, res) => {
    const {token} = req.body;

    const user = await UserModel.findOne({token: token});
    
    if(!user){
        throw new ExpressError(404, "user not found");
    }

    if(!req.file){
        throw new ExpressError(400, "no file uploaded")
    }
    user.profilePicture = req.file.filename;

    await user.save();
    return res.json({message : "profile picture updated"});
}




module.exports = { register, login, uploadProfilePicture };