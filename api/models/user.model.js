let mongoose = require('mongoose');
const { DATABASE_NAME } = require('../../constants/database');

let Schema = new mongoose.Schema({
    name: {
        require: true,
        type: String,
        default: ""
    },
    user_name: {
        require: true,
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true,
        default: ""
    },
    computer_code: {
        type: String,
        require: true,
        default: ""
    },
    created_at: {
        type: Number,
        default: Date.now()
    },

});

mongoose.model(DATABASE_NAME.USER, Schema)
module.exports = mongoose.model(DATABASE_NAME.USER)