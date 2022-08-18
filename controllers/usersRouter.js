/* eslint-disable no-case-declarations */
const usersRouter = require('express').Router();
const fs = require('fs');
let users = require('./usersData.json');
// Implementar DB. MongoDB?

function addData(user) {
  fs.readFile('./controllers/usersData.json', (err, data) => {
    if (err) return console.log(err);
    const datos = JSON.parse(data.toString());
    datos.push(user);
    fs.writeFile('./controllers/usersData.json', JSON.stringify(datos), (e) => {
      if (e) console.log(e);
    });
    return null;
  });
}

usersRouter.get('/', (req, res) => {
  res.json(users);
});

usersRouter.post('/', (req, res) => {
  const { body } = req;
  const date = new Date();
  const data = { ...body, id: date };
  if (users.map((u) => u.token).includes(body.token)) {
    res.json('Token alredy exist');
    return;
  }
  addData(data);
  users = users.concat(data);
  res.json(users);
});

module.exports = usersRouter;
