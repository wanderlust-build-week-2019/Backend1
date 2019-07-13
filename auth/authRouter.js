const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./../data/helpers/usersDbHelper');

const generateToken = require('./generateToken');

router.post('/guide/register', async (req, res) => {
  let user = req.body;

  if (!user.username || !user.password) {
    return res.status(400).json({ message: 'Need username and password' });
  }

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  user.role_id = 1;
  try {
    const newUser = await Users.add(user)
        
    // token on register so they don't have to login after
    const token = generateToken(newUser)

    res.status(201).json({
      message: `Welcome ${newUser.username}!`,
      token
    });

    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({
      message: 'Error adding the user',
    });
  }
});

router.post('/user/register', (req, res) => {

});

router.post('/login', (req, res) => {

});

module.exports = router;