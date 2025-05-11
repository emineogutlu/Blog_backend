const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const matchRoutes = require('./routes/matchRoutes');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();


mongoose.set('strictQuery', false);


connectDB();


app.use(cors()); 
app.use(express.json()); 


app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/matches', matchRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Bir hata oluştu!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

