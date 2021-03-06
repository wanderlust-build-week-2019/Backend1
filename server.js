const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');

server.use(express.json(), cors(), helmet());

const authRouter = require('./auth/authRouter.js');
const usersRouter = require('./api/users/usersRouter.js');
const toursRouter = require('./api/tours/toursRouter.js');
const requestsRouter = require('./api/requests/requestsRouter.js');

server.get('/', (req, res) => {
    res.status(200).json('hello world');
});

server.use('/auth/', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/tours', toursRouter);
server.use('/api/requests', requestsRouter);

module.exports = server;