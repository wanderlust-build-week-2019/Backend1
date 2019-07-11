const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./../data/helpers/usersDbHelper');

const generateToken = require('./generateToken');

router.post('/partner/register', (req, res) => {

});

router.post('/patron/register', (req, res) => {

});

router.post('/login', (req, res) => {

});

module.exports = router;