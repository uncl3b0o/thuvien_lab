const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const Reader = require('../models/Reader');

mongoose.plugin(slug);

// const Bookincallcard = new Schema({
//     idbook: { type: Schema.Types.ObjectId, required: true, ref: "books",},
//     topic: { type: String, required: true, },
// })

const Callcard = new Schema({
        readerid: { type: String, required: true, ref: 'Reader'},
        fullname: { type: String, required: true, },
        bookdetails: { type: String, required: true, ref: 'Book'},
        // topic: { type: String, required: true, },
        expirationdate: { type: Date, required: true, },
        returndate: { type: Date, },
        deposit: { type: String, required: true },
}, {
    timestamps : true,
});

module.exports = mongoose.model('Callcard',Callcard,'callcards');
