exports.up = function(knex, Promise) {
  return knex.schema.createTable('tours', function(tbl) {
    // we must use the callback syntax for .createTable()
    tbl.increments();

    tbl
      .string('type')
      .notNullable()
    tbl
      .string('location')
      .notNullable()
    tbl
      .integer('max_duration')
      .notNullable()
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tours');
};