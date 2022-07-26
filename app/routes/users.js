var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const User = require('../models/user');
require('dotenv').config();

const secret = process.env.JWT_TOKEN;

/* GET users listing. */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error registering new user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      res.status(401).json({ error: 'Incorret email or password' });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (!same) {
          res.status(401).json({ error: 'Incorret email or password' });
        } else {
          const token = jwt.sign({ email }, secret, { expiresIn: '10d' });
          res.json({ user: user, token: token });
        }
      });
    }
    } catch (error) {
      res.status(500).json({ error: 'Internal error, please try again' });
    }
  });

module.exports = router;
