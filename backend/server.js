
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes/userRoutes.js');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_CONNECT)
    .then(() => {
        console.log('MongoDB Connected Successfully');
    })
    .catch((err) => {
        console.log('DB Error:', err.message);
    });

// Routes
app.use('/user', routes);

// Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
