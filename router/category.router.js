const express = require('express');

const categoryController = require('../controllers/category.controller.js');

function categoryRouter(app) {
  const router = express.Router();

  app.use('/category', router);

  // list all categories
  router.get('/', categoryController.listCategory);
  // Search category by ID
  router.get('/:id', categoryController.getCategoryById);
  //Add Category
  router.post('/', categoryController.createCategory);
  //Delete Category
  router.delete('/:id', categoryController.deleteCategory);
}

module.exports = { categoryRouter };
