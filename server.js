const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');

server.use(express.json(), cors(), helmet());

const authRouter = require('./auth/authRouter.js');
const usersRouter = require('./api/users/usersRoute.js');
const toursRouter = require('./api/tours/toursRoute.js');

server.get('/', (req, res) => {
    res.status(200).json('hello world');
});

module.exports = server;