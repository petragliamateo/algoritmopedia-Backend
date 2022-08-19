/* eslint-disable no-case-declarations */
const thisRouter = require('express').Router();
const mysql = require('mysql');

const {
  readPosts, readTotalPosts, readPages, readByPostName,
} = require('../operations');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE,
});

thisRouter.get('/', (req, res) => {
  res.send('Hola');
});

thisRouter.get('/api/allposts', async (req, res) => {
  // Backup file for test with no internet connection
  if (Number(process.env.OFFLINE)) {
    // Backup created 31/7/2022
    // eslint-disable-next-line global-require
    res.json(require('../backup.json'));
    return;
  }
  await readPosts(pool, (result) => {
    res.json(result);
  });
});

thisRouter.get('/api/pages', async (req, res) => {
  await readPages(pool, (result) => {
    res.json(result);
  });
});

thisRouter.get('/api/pages/:id', async (req, res) => {
  // Funciona con pages/retos y pages/copa
  const name = req.params.id;
  await readByPostName(pool, name, (result) => {
    res.json(...result);
  });
});

thisRouter.get('/api/info', async (req, res) => {
  await readTotalPosts(pool, (result) => {
    res.send(`Total of posts: ${result.length}`);
  });
});

module.exports = thisRouter;
