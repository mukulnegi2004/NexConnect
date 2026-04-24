const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
    userId: {                                                              //who send comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    PostId: {                                                             //on which post comment should be visible
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    body: {
        type: String,
        required: true
    }
})


const CommentsModel = mongoose.model("Comment", commentsSchema);

module.exports = CommentsModel;