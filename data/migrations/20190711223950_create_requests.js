exports.up = function(knex, Promise) {
  return knex.schema.createTable('requests', function(tbl) {
    // we must use the callback syntax for .createTable()
    tbl.increments();

    tbl
      .boolean('is_private')
      .notNullable()
    tbl
      .integer('duration')
      .notNullable()
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users');
    tbl
      .integer('tour_id')
      .references('id')
      .inTable('tours');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('requests');
};