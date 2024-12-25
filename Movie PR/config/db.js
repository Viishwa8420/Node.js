const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://vishwaa8420:vishwa08@cluster0.qzx6y.mongodb.net/movie-pr`);

const db = mongoose.connection;

db.on("connected", (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`database successfully connected`);
})

module.exports = db;