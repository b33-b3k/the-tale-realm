const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const app = express();


// Middleware
app.use(cors());
// middleware for parsing request body
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send('Welcome to The Tale Realm Backend!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const userRoutes = require('./routes/userRoute');
const storyRoutes = require('./routes/storyRoute');
// const commentRoutes = require('./routes/commentRoute');

// Use routes
app.use('/users', userRoutes);
app.use('/stories', storyRoutes);
// app.use('/comments', commentRoutes);

