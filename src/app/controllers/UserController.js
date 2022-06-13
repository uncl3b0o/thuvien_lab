const express = require('express/lib/response');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const session = require('express-session')

class homeController {

  async register(req, res, next) {
    const { email, username, password} = req.body;
    const hashedpassword = await bcrypt.hash(password,10);
    const user = await User.findOne({email})
    if(!user) {
      User.create({
        email: email,
        username: username,
        password: hashedpassword,
        role: 'reader',
      })
      res.json({
        Message:"success"
      })
    } else{
      res.json({
        success: false,
        message: 'Email is already existed'
    })
    }
  }

  async login(req, res, next) {
    // req.session.isAuth = true; 

    const { email, username, password} = req.body;
    const user = await User.findOne({email: email})
    if(!user) {
      res.json({
        Message: "Your username or password is incorrect"
      })
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if(result === true) {
          if(user.role == "admin") { res.redirect('/') }
          else { res.redirect('/lib') }
        } else {
          res.json({
            Message: "Your username or password is incorrect"
          })
        }
      })
    }

    res.cookie('userId', user.id);
  }


 }
 
 module.exports = new homeController();