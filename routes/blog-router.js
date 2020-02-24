const router = require('express').Router();
const Posts = require('../models/blog-model.js');
const authenticate = require('../auth/authenticate-middleware.js');

//gets a list of all posts
router.get('/', authenticate, (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: 'Some error occured', error })
    })
});

//create a post
router.post('/', (req, res) => {
  // const { id } = req.params;
  let postInfo = req.body;
  Posts.add(postInfo)
    .then(added => {
      res.status(201).json(added)
    })
    .catch(error => {
      res.status(500).json({ message: 'Unable to add post to the database', error })
    })

})





module.exports = router;