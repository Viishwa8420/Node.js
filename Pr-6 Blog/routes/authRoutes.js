const express = require('express');
const {
    loginPage,
    dashboardPage,
    registerUser,
    loginUser,
    logoutUser,
    addBlog,
    insertData,
    deleteBlog,
    UpdateBlog,
    editBlog,
    readMore
} = require('../controllers/authControllers');

const multer = require('multer');

const routes = express.Router();

// Multer configuration for file uploads
const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
});

const fileupload = multer({ storage: st }).single('image');

// Routes
routes.get('/', loginPage); // Render the login & register page
routes.get('/dashboard', dashboardPage);
routes.post('/registeruser', registerUser); // Handle registration form submission
routes.post('/loginuser', loginUser); // Handle login form submission
routes.get('/logoutuser', logoutUser);
routes.get('/add', addBlog);
routes.post('/addblog', fileupload, insertData);
routes.get('/deleteblog', deleteBlog);
routes.post('/updateblog', fileupload, UpdateBlog);
routes.get('/readmore', readMore);
routes.get('/editblog', editBlog);

module.exports = routes;
