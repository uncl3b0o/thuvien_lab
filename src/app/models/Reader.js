const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Reader = new Schema({
    fullname: { type: String, required : true, },
    class: { type: String, required : true, },
    mail: { type: String, unique : true, },
    address: { type: String, required: true},
    phone: { type: String, unique : true, },
    dateofbirth: { type: String, required : true, },
    idcard: { type: String, unique : true, },
    object: { type: String, required : true, },
    gender: { type: String }
}, {
    timestamps : true,
});

module.exports = mongoose.model('Reader',Reader,'readers');