const express = require('express/lib/response');
const bcrypt = require('bcrypt');

class homeController {
    showHome(req, res,next){
        res.render('home');
   }
 }
 
 module.exports = new homeController();