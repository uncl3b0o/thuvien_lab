const express = require('express/lib/response');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const Book = require('../models/Book');
const Reader = require('../models/Reader');
const Callcard = require('../models/Callcard');

class homeController {
    //[GET] /
   //  showHome(req, res, next) {
   //     res.render('home');
   //  } 
     index = async (req, res,next) => {
      const resultBook = await Book.find({})  
        .then(books => {
          return books.length
        }).catch(next)

      const resultReader = await Reader.find({})  
        .then(readers => {
          return readers.length
        }).catch(next)
      
      const resultCallcard = await Callcard.find({})  
        .then(callcards => {
          return callcards.length
        }).catch(next)

      res.render('statistic', { resultBook: resultBook, resultCallcard: resultCallcard, resultReader: resultReader})
    }
 }
 
 module.exports = new homeController();