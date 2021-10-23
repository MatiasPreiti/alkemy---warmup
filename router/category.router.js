const express = require('express');
const slash = require('express-slash');

const categoryController = require('../controllers/category.controller.js');

function categoryRouter(app) {
  const router = express.Router();

  app.use('/category', router);

  // añadir
  app.use(slash());
  router.get('/', categoryController.listCategory);
  // buscar por ID - sino error
  router.get('/:id', categoryController.getCategoryById);
  //guardar nuevo post
  router.post('/', categoryController.createCategory);
  //elimitar post por ID
  router.delete('/:id', categoryController.deleteCategory);
}

module.exports = { categoryRouter };
