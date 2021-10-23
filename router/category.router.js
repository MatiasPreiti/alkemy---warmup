const express = require('express');

const categoryController = require('../controllers/category.controller.js');

function categoryRouter(app) {
  const router = express.Router();

  app.use('/category', router);

  // list all categories
  router.get('/', categoryController.listCategory);
  // buscar por ID -
  router.get('/:id', categoryController.getCategoryById);
  //guardar nueva category
  router.post('/', categoryController.createCategory);
  //eliminar categoria por ID
  router.delete('/:id', categoryController.deleteCategory);
}

module.exports = { categoryRouter };
