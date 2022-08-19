/* eslint-disable no-case-declarations */
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { body } = req;
  const userInDb = await User.findOne({ token: body.token });
  if (userInDb) {
    res.json('Token alredy exist');
    return;
  }
  const date = new Date();
  const user = new User({ ...body, date });
  const result = await user.save();
  res.status(201).json(result);
});

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = usersRouter;
