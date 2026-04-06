const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: false,
        unique: true,
    },
    fName: {
        type: String,
        required: false,
        unique: false
    },
    lName: {
        type: String,
        required: false,
        unique: false
    },
    friday: {
        type: String,
        required: false,
        unique: false
    },
    saturday: {
        type: String,
        required: false,
        unique: false
    },
    sunday: {
        type: String,
        required: false,
        unique: false
    },
    monday: {
        type: String,
        required: false,
        unique: false
    },
    handicap: {
        type: String,
        required: false
    },
    sidegames: {
        type: String,
        required: false,
        unique: false
    },
    shirt: {
        type: String,
        required: false,
        unique: false
    },
    paymentstatus: {
        type: Boolean,
        required: false,
        unique: false
    },
    requestedPartners: {
        type: [String],  // array of strings
        required: false,
        unique: false
    },
    token: {
        type: String,
        required: false,
        unique: true
    }    
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);