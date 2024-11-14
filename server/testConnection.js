const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Successfully connected to MongoDB Atlas!');
        
        // Test creating a comment
        const Comment = require('./models/Comment');
        const testComment = new Comment({
            name: 'Test User',
            text: 'Test Comment'
        });
        await testComment.save();
        console.log('Test comment created successfully!');
        
        // Fetch and display the comment
        const comments = await Comment.find();
        console.log('Current comments:', comments);
        
    } catch (error) {
        console.error('Connection error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

testConnection(); 