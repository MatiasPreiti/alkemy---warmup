const express = require('express');
const slash = require('express-slash');

const postController = require('../controllers/post.controller.js');

function postRouter(app) {
  const router = express.Router();

  app.use('/post', router);

  app.use(slash());

  //List Post
  router.get('/', postController.getAllPost);
  // Search Post by ID
  router.get('/:id', postController.getPostById);
  //Add post
  router.post('/', postController.addPost);
  //Update post
  router.patch('/:id', postController.editPost);
  //Delete post
  router.delete('/:id', postController.deletePost);
}

module.exports = { postRouter };
