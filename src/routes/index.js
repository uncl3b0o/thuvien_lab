const homeRouter = require('./home');
const readerRouter = require('./reader');
const bookRouter = require('./book');
const callcardRouter = require('./callcard');
const libRouter = require('./lib');
const staRouter = require('./statistic');
const userRouter = require('./user')

// MIDDLEWARES

const authMiddleware = require('../app/middlewares/auth');

function route(app) {
    app.use('/', homeRouter);
    app.use('/reader', authMiddleware.checkCookie, readerRouter);
    app.use('/book', authMiddleware.checkCookie,bookRouter);
    app.use('/callcard', authMiddleware.checkCookie, callcardRouter);
    app.use('/lib', libRouter);
    app.use('/statistic', authMiddleware.checkCookie, staRouter);
    app.use('/user', userRouter);
}

module.exports = route;