const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const mysql = require('mysql');
require('dotenv').config();

const { readPosts } = require('./operations');

app.use(express.json());

const pool  = mysql.createPool({
  connectionLimit : 10,
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
});

app.get('/', (req, res) => {
  res.send('Hola');
})

app.get('/allposts', async (req, res) => {
  await readPosts(pool, (result) => {
    res.json(result);
  })
})

module.exports = app; 
