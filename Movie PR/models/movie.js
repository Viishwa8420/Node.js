const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    movie_image: { type: String, required: true }, 
    movie_name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
    