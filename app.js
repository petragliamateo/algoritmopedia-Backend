const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const mysql = require('mysql');
require('dotenv').config();

const categoryRouter = require('./controllers/categoryRouter')

const { readPosts, readCopaAlgoritmopedia, readTotalPosts, readPages, readByPostName } = require('./operations');

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


app.get('/api/allposts', async (req, res) => {
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

app.get('/api/pages', async (req, res) => {
  await readPages(pool, (result) => {
    res.json(result);
  })
})

app.get('/api/pages/:id', async (req, res) => {
  // Funciona con pages/retos y pages/copa
  const name = req.params.id;
  await readByPostName(pool, name, (result) => {
    res.json(...result);
  })
})

app.get('/api/info', async (req, res) => {
  await readTotalPosts(pool, (result) => {
    res.send(`Total of posts: ${result.length}`)
  })
})

app.use('/api/categorias', categoryRouter);

module.exports = app; 
