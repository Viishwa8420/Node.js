const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Movie = require('./models/movie'); 
const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost/movieDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');  

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.render('index', { movies });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', async (req, res) => {
    const { movie_image, movie_name, description, price } = req.body;
    const newMovie = new Movie({
        movie_image,
        movie_name,
        description,
        price
    });

    await newMovie.save();
    res.redirect('/');
});

app.get('/movie/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('view', { movie });
});

app.get('/update/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('update', { movie });
});

app.post('/update/:id', async (req, res) => {
    const { movie_image, movie_name, description, price } = req.body;
    await Movie.findByIdAndUpdate(req.params.id, {
        movie_image,
        movie_name,
        description,
        price
    });

    res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(9000, () => {
    console.log('Server is running on http://localhost:3000');
});
