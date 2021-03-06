const db = require('../dbConfig.js');

module.exports = {
  add,
  findById,
  get,
  findBy,
};

function get() {
  return db('users');
}

async function add(user) {
  return db('users')
  .returning('id')
  .insert(user)
  .then(ids => {
    return findById(ids[0])
  });
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}