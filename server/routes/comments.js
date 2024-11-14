const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        text: req.body.text,
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;