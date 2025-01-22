const mongoose = require("mongoose");
const link = "mongodb+srv://vishwaa8420:vishwa08@cluster0.qzx6y.mongodb.net/blog";

const connectDb = async() => {
    try{
        await mongoose.connect(link)
        console.log("Database is successfully connected.");
    }
    catch(err){
        console.log(err);
        return false
        
    }
}
module.exports = connectDb;