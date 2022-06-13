const express = require('express/lib/response');
const Book = require('../models/Book');
const Reader = require('../models/Reader');
const Callcard = require('../models/Callcard');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class callcardController {
    //[GET] /
   //  showHome(req, res, next) {
   //     res.render('home');
   //  } 
    index(req, res,next){
      const ccdata = Callcard.find({})
      ccdata.populate('readerid').populate('bookdetails')
      .then( data => {
          const Call = data.map(item=> (
               {
                callcardid: item._id,
                readerid: item.readerid._id,
                class: item.readerid.class,
                fullname: item.fullname,
                topic: item.bookdetails.topic,
                cost: item.bookdetails.cost,
                createdat: item.createdAt,
                expirationdate: item.expirationdate,
                deposit: item.deposit,
               }
          ));
        res.render('callcard', { Call: Call})
      })
      .catch(err => {
        res.json({
          Message:'FAILED'
        })
        console.log(err)
      })
   }

  async create(req, res, next){
    const readers = await Reader.find({})
    res.render('callcard/createdcallcard', { readers: mutipleMongooseToObject(readers)})
  }

  async created(req, res, next){
    const callcard = new Callcard(req.body);
    callcard.save()
      .then(() => {
        res.redirect('/callcard')
      })
      .catch(err => {
        res.json({
          Message:'FAILED'
        })
      })
    
    // res.json(req.body)
  }

  edited(req, res, next){
    Callcard.findById(req.params.id)
      .then( callcards => { res.render('callcard/edit', {
        callcards: mongooseToObject(callcards)
      })})
      .catch(next);
  }

  updated(req, res, next){
    Callcard.updateOne({_id: req.params.id}, req.body)
      .then(() => res.redirect('/callcard'))
      .catch(next)
  }

  deleted(req, res, next) {
    Callcard.deleteOne({_id: req.params.id}, req.body)
    .then(() => res.redirect('/callcard'))
    .catch(next)
  }

  // SEARCH Callcard
  async search(req, res, next) {
    //get query
    const {q} = req.query;

    //get + populate models
    const ccdata = Callcard.find({})
    ccdata.populate('readerid').populate('bookdetails')
    .then( data => {
        const Call = data.map(item=> (
             {
              callcardid: item._id,
              readerid: item.readerid._id,
              class: item.readerid.class,
              fullname: item.fullname,
              topic: item.bookdetails.topic,
              cost: item.bookdetails.cost,
              createdat: item.createdAt,
              expirationdate: item.expirationdate,
              deposit: item.deposit,
             }
        ));

        //filter function
        const callcardResult = Call.filter((item) => {
          if(q == "") {
            return item;
          } else if ( item.fullname.toLowerCase().trim().includes(q.toLowerCase().trim()) || item.callcardid.toLowerCase().trim().includes(q.toLowerCase().trim()) || item.readerid.toLowerCase().trim().includes(q.toLowerCase().trim()) || item.topic.toLowerCase().trim().includes(q.toLowerCase().trim())) {
            return item;
          }
        })
        res.render('callcard', { Call: callcardResult})
    })
    .catch(err => {
      res.json({
        Message:'FAILED'
      })
      console.log(err)
    })
  }

 }
 
 module.exports = new callcardController();