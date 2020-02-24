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

//edit a post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Posts.findById(id)
    .then(updatedPost => {
      if(updatedPost) {
        Posts.update(changes, id)
          .then(updatedPost => {
            res.json(updatedPost);
          })
      } else {
        res.status(404).json({ message: 'Could not find Post with the given id', error })
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to update Post', error })
    })
})


module.exports = router;