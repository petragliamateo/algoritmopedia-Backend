/* eslint-disable no-case-declarations */
const usersRouter = require('express').Router();
let users = require('./usersData.json')
const fs = require('fs')

function addData(user) {
  fs.readFile('./controllers/usersData.json', (err, data) => {
    if(err) return console.log(err);
    const datos = JSON.parse(data.toString())
    datos.push(user);
    fs.writeFile('./controllers/usersData.json', JSON.stringify(datos), (e) => {
      if (err) console.log(err);
    })
  })
}

usersRouter.get('/', (req, res) => {
  res.json(users);
})

usersRouter.post('/', (req, res) => {
  const { body } = req;
  const date = new Date();
  const data = { ...body, id: date }
  addData(data)
  users = users.concat(data);
  res.json(users);
})

module.exports = usersRouter;
