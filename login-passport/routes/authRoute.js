const express = require('express');

const routes = express.Router();

const { loginpage, registerpage, registerUser, dashboardPage, loginUser, productPage, logout } = require('../controllers/AuthController');


const passport = require('passport');

routes.get('/',loginpage);
routes.get('/register',registerpage);
routes.post('/registeruser', registerUser);
routes.post('/loginuser',passport.authenticate('local', {failureRedirect: '/'}),loginUser);
routes.get('/logout', logout);


routes.get('/dashboard',passport.checkUser,dashboardPage);
routes.get('/product',passport.checkUser, productPage);

module.exports = routes;