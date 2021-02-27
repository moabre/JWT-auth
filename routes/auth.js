const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { register, login } = require('../validation');

router.post('/register', async (req, res) => {
  //Validate the data
  const { error } = register(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Checking if user is in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //New User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const saveUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login
router.post('/login', async (req, res) => {
  //Validate the data
  const { error } = login(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Checking if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email or password is wrong');
  //Password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  res.send('Logged in!');
});

module.exports = router;
