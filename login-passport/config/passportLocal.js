const passport = require('passport');

const passportlocal = require('passport-local').Strategy;

const User = require('../models/UserModel');



passport.use(new passportlocal({
    usernameField: 'email',
}, async(email, password, done)=>{
    try{
        const user = await User.findOne({email : email});
       if(!user || user.password != password) {
        console.log("Email & Password do not match");
        return done(null, false, {message: "Email & Password do not match"});
        
       }
      return done(null,user);
    }
    catch(err){
        console.log(err);
        return done(null, false);
        
    }
}))

passport.serializeUser((user, done) =>{
    return done(null, user._id);
})

passport.deserializeUser(async(id,done)=>{
    try{
        const user = await User.findById(id);
        return done(null, user);

        
    }catch(err){
        console.log(err);
    return done(null,false)
    }
})


//check authentication
passport.checkUser = async (req,res,next)=>{
    try{
       if(!req.isAuthenticated()){
        return res.redirect('/');
    }
    return next();
    }catch(err){
        console.log(err);
        return false;
    }
}

//save session store in userdata
passport.setUser = async (req,res,next)=>{
    try{
       if(req.isAuthenticated()){
       res.locals, users = req.user;
    }
   return next();
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = passport;