const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('express').urlencoded({ extended: true });

const app = express();
const port = 8000;

// MongoDB Connection
mongoose.connect('mongodb://localhost/book_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => console.log('Database connected successfully'));
db.on('error', (err) => console.log(`Database connection error: ${err}`));

// Book Model
const BookModel = require('./models/BookModel');

// Setting EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser);

// Routes
app.get('/', async (req, res) => {
    try {
        const books = await BookModel.find({});
        res.render('view', { books });
    } catch (err) {
        console.error(err);
    }
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/insertrecord', async (req, res) => {
    try {
        const { book_name, book_price, book_pages, book_author } = req.body;
        await BookModel.create({ book_name, book_price, book_pages, book_author });
        res.redirect('/');
    } catch (err) {
        console.error(err);
    }
});

app.get('/deletebook', async (req, res) => {
    try {
        await BookModel.findByIdAndDelete(req.query.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
    }
});

app.get('/editbook', async (req, res) => {
    try {
        const book = await BookModel.findById(req.query.id);
        res.render('edit', { book });
    } catch (err) {
        console.error(err);
    }
});

app.post('/updatebook', async (req, res) => {
    try {
        const { editid, book_name, book_price, book_pages, book_author } = req.body;
        await BookModel.findByIdAndUpdate(editid, { book_name, book_price, book_pages, book_author });
        res.redirect('/');
    } catch (err) {
        console.error(err);
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
