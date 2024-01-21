const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authroutes')
const homeRoutes = require('./routes/homeroutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(cors());

dotenv.config()

app.use('/auth',authRoutes);
app.use('/home',homeRoutes)



mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT || 3001, () => {
            console.log('Server is running on port ' + (process.env.PORT || 3001));
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });
    