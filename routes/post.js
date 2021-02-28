const router = require('express').Router();
const auth = require('./privateRoute');

router.get('/', auth, (req, res) => {
  res.json({
    posts: { title: 'my first post', description: 'data that is auth' },
  });
});

module.exports = router;
