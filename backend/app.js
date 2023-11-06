const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const userRoutes = require('./routes/userRoute');
const storyRoutes = require('./routes/storyRoute');

const app = express();


app.use(express.raw());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());


app.use('/users', userRoutes);
app.use('/stories', storyRoutes);



app.use((req, res, next) => {
    res.status(404)
    res.send({ error: 'Invalid Endpoint' })
});

module.exports = app;