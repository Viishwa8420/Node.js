const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    book_name: { type: String, required: true },
    book_price: { type: Number, required: true },
    book_pages: { type: String, required: true },
    book_author: { type: String, required: true },
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
