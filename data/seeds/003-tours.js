// ./seeds/001-roles.js
exports.seed = function(knex, Promise) {
  // the 00-cleanup.js seed already deleted all records
  // we just worry about seeding records in all other seeds
  return knex('tours').insert([
    { type: 'sight seeing', location: 'myrtle beach', max_duration: 3, user_id: 1 },
    { type: 'adventure', location: 'miami', max_duration: 3, user_id: 1 },
    { type: 'adventure', location: 'detroit', max_duration: 2, user_id: 3 },
  ]);
};