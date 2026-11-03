const routes = require('./routes/userRoutes.js')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_CONNECT)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("DB Error:", err.message);
});


app.use('user',routes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
