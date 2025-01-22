const path = require('path');
const blog = require('../models/blogSchema')

// Render login & register page
const loginPage = (req, res) => {
    res.render('login & register'); // Ensure the file name matches exactly
};
const dashboardPage = (req, res) => {
    // Example: Fetch blogs from your database
    const blogs = [
        { image: 'image1.jpg', title: 'Blog 1' },
        { image: 'image2.jpg', title: 'Blog 2' },
    ];

    res.render('dashboard', { Blog: blogs });
};

const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    // Add logic to save user data to the database
    res.redirect('/dashboard'); // Redirect to dashboard after successful registration
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    // Add logic to authenticate user
    res.redirect('/dashboard'); // Redirect to dashboard after successful login
};

const logoutUser = (req, res) => {
    // Add logic to handle user logout
    res.redirect('/');
};

const addBlog = (req, res) => {
    res.render('addBlog'); // Render the Add Blog page
};

const insertData = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? req.file.filename : null;

        const newBlog = new blog({ title, content, image });
        await newBlog.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error inserting blog:", error);
        res.status(500).send("Error adding blog");
    }
};const deleteBlog = async (req, res) => {
    try {
        const id = req.query?.deleteid;

        if (!id) {
            return res.status(400).send("Invalid request: No blog ID provided");
        }

        const deletedBlog = await blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).send("Blog not found");
        }

        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).send("Error deleting blog");
    }
};


const UpdateBlog = async (req, res) => {
    try {
        const { id, title, content } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!id) {
            return res.status(400).send("Invalid request: No blog ID provided");
        }

        const blogToUpdate = await blog.findById(id);
        if (!blogToUpdate) {
            return res.status(404).send("Blog not found");
        }

        blogToUpdate.title = title || blogToUpdate.title;
        blogToUpdate.content = content || blogToUpdate.content;
        if (image) blogToUpdate.image = image;

        await blogToUpdate.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).send("Error updating blog");
    }
};

const editBlog = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).send("Invalid request: No blog ID provided");
        }

        const blogToEdit = await blog.findById(id);
        if (!blogToEdit) {
            return res.status(404).send("Blog not found");
        }

        res.render('editBlog', { blog: blogToEdit });
    } catch (error) {
        console.error("Error fetching blog for editing:", error);
        res.status(500).send("Error loading edit page");
    }
};

const readMore = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).send("Invalid request: No blog ID provided");
        }

        const blogToRead = await blog.findById(id);
        if (!blogToRead) {
            return res.status(404).send("Blog not found");
        }

        res.render('readMore', { blog: blogToRead });
    } catch (error) {
        console.error("Error fetching blog details:", error);
        res.status(500).send("Error loading blog details");
    }
};

module.exports = {
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
};