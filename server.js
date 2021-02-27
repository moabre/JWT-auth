const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');

dotenv.config();

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log('connected')
);

//Import Routes
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/api/user', authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server up and running on ${PORT} `));
