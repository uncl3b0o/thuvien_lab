const express = require('express')
const User = require('../models/User')

class AuthMiddleware {
    async checkCookie (req, res, next) {
        if(!req.cookies.userId) {
            res.redirect('/lib');
            return;
        }

        const user = await User.findById(req.cookies.userId);
        if(!user) {
            res.redirect('/lib');
            return;
        }

        next();
    }
}

module.exports = new AuthMiddleware();