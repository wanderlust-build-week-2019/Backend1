const router = require('express').Router();
const Users = require('./../../data/helpers/usersDbHelper');

router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
  res.status(200).json(users);
} catch (error) {
  // log error to server
  console.log(error);
  res.status(500).json({
    message: 'Error retrieving the users',
  });
}
  
});

router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;