const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Book = new Schema({
    idbook: { type: String, unique : true, },
    topic: { type: String, required : true, },
    author: { type: String, required : true, },
    type: { type: String, required : true, },
    nxb: { type: String, required: true},
    date: { type: String, required: true},
    cost: { type: String, required: true},
    description: { type: String, required: true},
    image: { type: String, required: true},
}, {
    timestamps : true,
});

module.exports = mongoose.model('Book',Book,'books');