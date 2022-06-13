const express = require('express/lib/response');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Book = require('../models/Book');
const User = require('../models/User')

class homeController {
    //[GET] /
   //  showHome(req, res, next) {
   //     res.render('home');
   //  } 
    async showHome(req, res,next){
      const user = await User.findById(req.cookies.userId)
            Book.find({})
            .then(books => {
                res.render('lib', {books: mutipleMongooseToObject(books), user: mongooseToObject(user)})
            })
            .catch()
   }
 }
 
 module.exports = new homeController();