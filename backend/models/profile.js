const mongoose = require("mongoose");


const educationSchema = new mongoose.Schema({
    school : {
        type: String,
        default: ""
    },
    degree : {
        type: String,
        default: ""
    },
    fieldOfStudy : {
        type: String,
        default: ""
    }
});



const workSchema = new mongoose.Schema({
    company : {
        type: String,
        default: ""
    },
    positions : {
        type: String,
        default: ""
    },
    years : {
        type: String,
        default: ""
    }

})


const profileSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bio : {
        type: String,
        default: ""
    },
    currentPost : {
        type: String,
        default: ""
    },
    pastWork: {                       //this field is an array of objects, and each object follows the structure defined by workSchema
        type: [workSchema], 
        default: []
    },
    education: {                      //this field is an array of objects, and each object follows the structure defined by educationSchema
        type: [educationSchema],
        default: []
    }
})


const ProfileModel = mongoose.model("Profile", profileSchema);

module.exports = ProfileModel;