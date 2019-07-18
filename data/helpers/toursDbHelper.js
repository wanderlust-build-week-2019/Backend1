const db = require('../dbConfig.js');

module.exports = {
    get,
    add,
    updateTour,
    findBy,
    findById,
    remove,
    getTourRequests
};

function get() {
    return db('tours');
};

async function add(tour) {
    return db('tours')
        .insert(tour)
        .then(ids => {
            return findByIdPlain(ids[0]);
        });
};

async function updateTour(id, changes) {
    return db('tours')
        .where({id})
        .update(changes)
        .then(function() {
            return findByIdPlain(id)
        });
}

async function findBy(filter) {
    return db('tours').where(filter);
}

function findByIdPlain(id) {
    return db('tours').where({id}).first();
}

function findById(id) {
  let query = db('tours').where({id}).first();

  const promises = [query, this.getTourRequests(id)]; // [ tour, request ]

  return Promise.all(promises).then(function(results) {
    
    let [tour, requests] = results;

    if (tour) {
      tour.requests = requests;

      return tour
    } else {
      return undefined;
    }
  });
};

async function remove(id) {
    return db('tours').where({ id }).del();
}

function getTourRequests(tourId) {
  return db('requests')
    .where('tour_id', tourId)
}