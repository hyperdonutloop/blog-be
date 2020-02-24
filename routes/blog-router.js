const router = require('express').Router();
const Posts = require('../models/blog-model.js');
const authenticate = require('../auth/authenticate-middleware.js');

router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: 'Some error occured', error })
    })
})


module.exports = router;