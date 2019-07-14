// ./seeds/001-roles.js
const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // the 00-cleanup.js seed already deleted all records
  // we just worry about seeding records in all other seeds

  // password for seeded users is the word 'in'
  const hash = bcrypt.hashSync('in', 10);
  return knex('users').insert([
    { username: 'guide', password: hash, role_id: 1 },
    { username: 'user', password: hash, role_id: 2 },
  ]);
};