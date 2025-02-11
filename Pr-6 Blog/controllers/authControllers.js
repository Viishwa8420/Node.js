const path = require('path');
const blog = require('../models/blogSchema')

// Render login & register page
const loginPage = (req, res) => {
    res.render('login & register'); 
};
const dashboardPage = async (req, res) => {
   try {
    
    const blogs = await blog.find({});

    res.render('dashboard', { Blog : blogs });
   } catch (error) {
       console.log(error);
       return false
    
   }
};  

const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    res.redirect('/dashboard');
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    res.redirect('/dashboard'); 
};

const logoutUser = (req, res) => {
    res.redirect('/');
};

const addBlog = (req, res) => {
    res.render('addBlog'); 
};

const insertData = async (req, res) => {
    try {
        const { title, description, author } = req.body;
        const newBlog = new blog({
            title: title,
            description: description,
            author: author,
            image: req.file ? req.file.path : ''
        });

        await newBlog.save();
        console.log("New blog post published successfully");
        return res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        return false
        
    }
};
const deleteBlog = async (req, res) => {
    try {
        const id = req.query.deleteid;
        await blog.findByIdAndDelete(id);
        res.redirect('/dashboard');
        
    } catch (error) {
        console.log(error);
        return false
        
    }
};

const UpdateBlog = async (req, res) => {
    try {
      const { editid, title, description, author } = req.body;
  
      const blogPost = await blog.findById(editid);
      if (!blogPost) {
        return res.status(404).send("Blog post not found");
      }
  
      const updateData = { title, description, author };
      if (req.file) {
        updateData.image = req.file.path;
      }
  
      await blog.findByIdAndUpdate(editid, updateData);
  
      if (req.file) {
        try {
          fs.unlinkSync(blogPost.image);
          console.log("Old blog image deleted successfully");
        } catch (error) {
          console.error("Error deleting old blog image:", error);
        }
      }
  
      console.log("Blog updated!");
      return res.redirect('/dashboard');
    } catch (err) {
      console.error("Error updating blog:", err);
      return res.status(500).send("Failed to update blog");
    }
  };
const editBlog = async (req, res) => {
    try {
      const id = req.query.editid;
      const blogPost = await blog.findById(id);
  
      if (!blogPost) {
        return res.status(404).send('Blog post not found');
      }
      res.render('editblog', { blogPost: blogPost }); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
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