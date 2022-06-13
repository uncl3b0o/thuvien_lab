const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const cookieParser = require('cookie-parser')
var methodOverride = require('method-override')
const mongoose = require('mongoose');
const app = express()
const port = 2020

const handlebars = require('express-handlebars')
const path = require('path')
const hbs = handlebars.create({
  extname: 'hbs',
  helpers: {
    sum : (a, b) => a + b,
  }
})

const route = require('./routes')

app.use(cookieParser())


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

route(app);

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// CONNECT DB

// const db = require('./config/db');
// db.connect(); //connect db

const mongoURI = "mongodb://localhost:27017/library"

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
})
  .then((res) => {
    console.log("Connect successfully!!!");
  }).catch((err) => {
    console.log("Failed !!!");
  });


// PATH 

app.set('views', path.join(__dirname, 'resources','views'));
app.use(express.static(__dirname + '/public'));

console.log(__dirname)

// SESSION


const store = new MongoDBSession({
  uri: mongoURI,
  collection: 'sessions'
})

app.use(session({
  secret: 'key that will sign cookie',
  resave: false,
  saveUninitialized: false,
  store: store, 
}));


app.listen(port, () => {
  console.log(`App listen at http://localhost:${port}`);
})
