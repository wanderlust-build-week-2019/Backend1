// ./seeds/00-cleanup.js
const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    // w/o wipes out migration data, tries recreating a db that already exists.
    mode: "delete",
    ignoreTables: ["knex_migrations", "knex_migrations_lock"]
  });
};
