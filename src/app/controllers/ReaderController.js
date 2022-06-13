const express = require('express/lib/response');
const Reader = require('../models/Reader');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class readerController {
    //[GET] /
    //  showHome(req, res, next) {
    //     res.render('home');
    //  } 
    index(req, res,next){
        Reader.find({})
          .then(readers => {
            res.render('reader', {
              readers: mutipleMongooseToObject(readers)
            })
          })
          .catch(next)
    }

    create(req, res, next){
      res.render('reader/createdreaders')
    }

    // POST create readers
    created(req, res, next){
      const reader = new Reader(req.body);
      reader.save()
        .then(() => res.redirect('/reader')) 
        .catch(error => { 

        }); 
      
      console.log(reader)
    }

    // GET edit readers
    edited(req, res, next){
      Reader.findById(req.params.id)
        .then( readers => res.render('reader/edit', {
          readers : mongooseToObject(readers)
        }))
        .catch(next);
    }

    // PUT edit readers
    updated(req, res, next){
      Reader.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/reader'))
        .catch(next);
    }

    // DELETE delete readers
    deleted(req, res, next){
      Reader.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }

    // GET search 
    async search(req, res, next){
      const {q} = req.query;
      const reader = await Reader.find({});
      const readerFilter = reader.filter((item) => {
        if( q == ""){
          return item; 
        } else if(item.fullname.toLowerCase().trim().includes(q.toLowerCase().trim())){
          return reader;
        }
      })
      res.render('reader', {readers: mutipleMongooseToObject(readerFilter)});
    }
}
 
 module.exports = new readerController();