const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const User = new Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, required: true,},
    role: {type: String,},
    password: {type: String, required: true,},
}, {
    timestamps : true,
});

module.exports = mongoose.model('User',User,'users');