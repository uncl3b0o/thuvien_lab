const express = require('express/lib/response');
const Book = require('../models/Book');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class bookController {
  //[GET] /
  //  showHome(req, res, next) {
  //     res.render('home');
  //  } 
  index(req, res,next){
    Book.find({})
      .then(books => {
        res.render('book', {
          books: mutipleMongooseToObject(books)
        })
      })
      .catch(next);
  }

  create(req, res, next){
    res.render('book/createdbook')
  }

  created(req, res, next){
      const book = new Book(req.body);
      book.save()
        .then(() => res.redirect('/book')) 
        .catch(error => {

        }); 
  }

  edited(req, res, next){
    Book.findById(req.params.id)
      .then( books => { res.render('book/edit', {
        books: mongooseToObject(books)
      })})
      .catch(next);
  }


  //PUT book 
  updated(req, res, next){
    Book.updateOne({_id: req.params.id}, req.body)
      .then(() => res.redirect('/book'))
      .catch(next)
  }

  //DELETE book
  deleted(req, res, next){
    Book.deleteOne({id: req.params.id}, req.body)
      .then(() => res.redirect('/book'))
      .catch(next)
  }

  //GET search book
  async search(req, res, next){
    const {q} = req.query;
    const book = await Book.find({});
    const bookFilter = book.filter((item) => {
      if(q == ""){
        return item
      } else if(item.topic.toLowerCase().trim().includes(q.toLowerCase().trim()) || item.nxb.toLowerCase().includes(q.toLowerCase()) || item.author.toLowerCase().includes(q.toLowerCase())){
        return item
      }
    })
    res.render('book', { books: mutipleMongooseToObject(bookFilter)})
  }


 }
 
 module.exports = new bookController();