// ./seeds/001-roles.js
exports.seed = function(knex, Promise) {
  // the 00-cleanup.js seed already deleted all records
  // we just worry about seeding records in all other seeds
  return knex('requests').insert([
    { is_private: false, duration: 2, user_id: 2, tour_id: 1 },
    { is_private: true, duration: 1, user_id: 3, tour_id: 1 },
    { is_private: true, duration: 1, user_id: 2, tour_id: 2 },
  ]);
};