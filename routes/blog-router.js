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

//gets a post by an id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then(post => {
      if (post) {
        res.json(post)
      } else {
        res.status(404).json({ message: 'Could not find post with the specified id' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to get post', error })
    })
  
})

//create a post
router.post('/', (req, res) => {
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

//delete a post

router.delete('/:id', (req, res) => {
  const { id} = req.params;

  Posts.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ message: 'Post has been destroyed 💀' })
      } else {
        res.status(404).json({ message: 'Could not find post with the given id' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Faled to delete post', error })
    })
})


module.exports = router;