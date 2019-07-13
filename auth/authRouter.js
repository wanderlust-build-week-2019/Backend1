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

router.post('/user/register', async (req, res) => {
  let user = req.body;

  if (!user.username || !user.password) {
    return res.status(400).json({ message: 'Need username and password' });
  }

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  user.role_id = 2;
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

router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Need username and password' });
  }

  try {
    let user = await Users.findBy({ username }).first()    

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }

    } else {
      res.status(404).json({ message: 'user not found' });
    }

  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the user',
    });
  }
});

module.exports = router;