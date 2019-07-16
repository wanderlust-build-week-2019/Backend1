const knex = require('knex');

// test || production || dev
const environment = process.env.DB_ENV || process.env.NODE_ENV ||  'development';
const config = require("../knexfile.js")[environment];
module.exports = knex(config);
