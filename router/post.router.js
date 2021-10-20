const postController = require('../controllers/post.controller.js');

module.exports = (app) => {
  // la totalidad de respuestas deben tener solo id title imagen categoria y creacion
  //listado de post por fecha de creacion decendiente
  app.get('/', postController.getpost);
  // buscar por ID - sino error
  app.get('/:id', postController.getpost);
  //guardar nuevo post
  app.post('/', postController.addPost);
  //actualizar por por Id - sino error
  app.patch('/:id', postController.editPost);
  //elimitar post por ID
  app.delete('/:id', postController.deletePost);
};
