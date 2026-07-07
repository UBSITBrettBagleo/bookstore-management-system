const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/test', (req, res) => {
    res.send('Books route is working!');
});

//Get All Books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get One Book
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//add book
router.post('/', async (req, res) => {

    try {

        const book = new Book({

            title: req.body.title,

            author: req.body.author,

            genre: req.body.genre,

            price: req.body.price,

            stock: req.body.stock,

            coverImage: req.body.coverImage,

            description: req.body.description,

        });

        const newBook = await book.save();

        res.status(201).json(newBook);

    }

    catch (err) {

        res.status(400).json({ message: err.message });

    }

});

//update
router.put('/:id', async (req, res) => {

    try {

        console.log(req.body);

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        console.log(updatedBook);

        res.json(updatedBook);

    } catch (err) {

        console.error(err);

        res.status(400).json({
            message: err.message
        });

    }

});

//Delete
router.delete('/:id', async (req, res) => {

    try {

        await Book.findByIdAndDelete(req.params.id);

        res.json({

            message: 'Book deleted successfully'

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});


module.exports = router;