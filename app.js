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
  // Backup file for test with no internet connection
  if (Number(process.env.OFFLINE)){
    // Backup created 31/7/2022
    res.json(require('./backup.json'));
    return;
  }
  await readPosts(pool, (result) => {
    res.json(result);
  })
})

module.exports = app; 
