const express = require('express');
const slash = require('express-slash');

const postController = require('../controllers/post.controller.js');

function postRouter(app) {
  const router = express.Router();

  app.use('/post', router);

  // añadir
  app.use(slash());
  // la totalidad de respuestas deben tener solo id title imagen categoria y creacion
  //listado de post por fecha de creacion decendiente
  router.get('/', postController.getAllPost);
  // buscar por ID - sino error
  router.get('/:id', postController.getPostById);
  //guardar nuevo post
  router.post('/', postController.addPost);
  //actualizar por por Id - sino error
  router.patch('/:id', postController.editPost);
  //elimitar post por ID
  router.delete('/:id', postController.deletePost);
}

module.exports = { postRouter };
