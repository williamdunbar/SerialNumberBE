let mongoose = require('mongoose');
const { DATABASE_NAME } = require('../../constants/database');

let Schema = new mongoose.Schema({
    ip: {
        require: true,
        type: String,
        default: ""
    },
    method: {
        require: true,
        type: String,
        default: ""
    },
    path: {
        type: String,
        required: true,
        default: ""
    },
    content: {
        type: String,
        require: true,
        default: ""
    },
    created_at: {
        type: Number,
        default: Date.now()
    },

});

mongoose.model(DATABASE_NAME.LOG, Schema)
module.exports = mongoose.model(DATABASE_NAME.LOG)