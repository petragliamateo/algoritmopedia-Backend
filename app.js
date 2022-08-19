/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

app.use(cors());

require('dotenv').config();

const categoryRouter = require('./controllers/categoryRouter');
const usersRouter = require('./controllers/usersRouter');
const sqlRouter = require('./controllers/sqlRouter');

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connected!'))
  .catch(() => console.log('Error'));

app.use('/api/categorias', categoryRouter);
app.use('/api/users', usersRouter);
app.use('', sqlRouter);

module.exports = app;
