const User = require('../models/UserModel');

const loginpage = async (req,res) => {

    try{
      
        return res.render('login');
    }catch(err){
        console.log(err);
        return false;   
    }
}
const registerpage = async (req,res) => {

    try{
        return res.render('register');
    }catch(err){
        console.log(err);
        return false;   
    }
}

const registerUser = async (req, res)=>{
    try{
        const {name,email,password} = req.body;
        const user = await User.create({
            name:name,
            email:email,
            password:password
        })
        console.log(`user registered successfully.`);
        return res.redirect('/');
        
    }catch(err){
        console.log(err);
        return false;   
    }
}

const dashboardPage = (req, res) =>{
    try{
        return res.render('dashboard');
    }catch(err){
        console.log(err);
        return false;   
    }
}

const loginUser = async (req,res) =>{
    try{
        return res.redirect('/dashboard');
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const productPage = (req, res) =>{
    return res.render('product');
}

const logout = (req, res) =>{
    req.logout((err)=>{
        if(err){
            console.log(err);
            return false;
        }
        return res.redirect('/');
        
    })
}


module.exports ={
    loginpage , registerpage, registerUser, dashboardPage, loginUser, productPage, logout
}