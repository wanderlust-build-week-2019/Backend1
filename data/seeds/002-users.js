// ./seeds/001-roles.js
exports.seed = function(knex, Promise) {
  // the 00-cleanup.js seed already deleted all records
  // we just worry about seeding records in all other seeds
  return knex('users').insert([
    { username: 'guide', password: 'in', role_id: 1 },
    { username: 'user', password: 'in', role_id: 2 },
  ]);
};