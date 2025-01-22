const express = require('express');

const port = 8000;

const app = express();

app.set('view engine','ejs');

const db = require('./config/db');

const passport = require('passport');
const passportlocal = require('./config/passportLocal');
const session = require('express-session');

app.use(session({
    secret: 'viniie',
    resave: false,
    saveUninitialized : false,
    cookie: {
         maxAge: 1000*60*60*24 // 1 day
        }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

app.use(express.urlencoded());

app.use('/',require('./routes/indexRoute'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is running on port : ${port}`);
    
})