/* eslint-disable no-case-declarations */
const categoryRouter = require('express').Router();
const categorias = require('./categorias');

categoryRouter.get('/', (req, res) => {
  res.json(categorias);
})

module.exports = categoryRouter;
