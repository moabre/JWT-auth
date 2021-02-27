const router = require('express').Router();
const User = require('../model/User');
const { register, login } = require('../validation');

router.post('/register', async (req, res) => {
  const { error } = register(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
