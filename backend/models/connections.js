const mongoose = require("mongoose");

const connectionsSchema = new mongoose.Schema({
    userId: {                                                     //who send request
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    connectionId: {                                               //who receive request
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status_accepted: {
        type: Boolean,
        default: null
    }

})

const ConnectionsModel = mongoose.model("Connection", connectionsSchema);

module.exports = ConnectionsModel;














