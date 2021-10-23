const categoryModel = require('../models').category;

// GET ALL CATEGORY
async function listCategory(req, res) {
  try {
    const allCategory = await categoryModel.findAll({});
    res.send(allCategory);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}

// GET CATEGORY BY ID
async function getCategoryById(req, res) {
  try {
    const category = await categoryModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(category);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}

// CREATE CATEGORY
async function createCategory(req, res) {
  try {
    const category = await categoryModel.create({
      name: req.body.name,
      title: req.body.title,
    });
    res.send(category);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}

// DELETE CATEGORY
async function deleteCategory(req, res) {
  try {
    const category = await categoryModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(category);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}

module.exports = {
  listCategory,
  getCategoryById,
  createCategory,
  deleteCategory,
};
