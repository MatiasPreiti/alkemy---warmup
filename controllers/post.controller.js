const postModel = require('../models').post;
const isImageURL = require('image-url-validator').default;

// GET ALL POST
async function getAllPost(req, res) {
  try {
    const allPost = await postModel.findAll({});
    res.send(allPost);
  } catch (error) {
    res.status(400).send(error);
  }
}

//AND GET POST BY ID
async function getPostById(req, res) {
  try {
    const requestPost = await postModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!requestPost) {
      res.status(404).json({
        succes: true,
        msg: 'Post not found',
      });
    } else {
      res.send(requestPost);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// CREATE POST
async function addPost(req, res) {
  let isImage = await isImageURL(req.body.image);
  if (!isImage) {
    res.status(400).json({
      success: false,
      error: 'the image is not valid',
    });
  } else {
    try {
      const newPost = await postModel.create({
        title: req.body.title,
        text: req.body.text,
        image: req.body.image,
        category: req.body.category,
        creationDate: req.body.creationDate,
      });
      res.status(200).json({
        success: true,
        msg: `your post ${newPost.title} has been created`,
        post: newPost,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: 'the post cannot be created',
      });
    }
  }
}

// PATCH POST
async function editPost(req, res) {
  try {
    const options = { multi: true };
    const values = {
      title: req.body.title,
      text: req.body.text,
      image: req.body.image,
      category: req.body.category,
      creationDate: req.body.creationDate,
    };
    const condition = {
      where: {
        id: req.params.id,
      },
    };
    const updatedPost = await postModel.update(values, {
      ...condition,
      ...options,
    });
    res.send(`your post ${req.body.title} has been updated`);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'the update cannot be completed',
    });
  }
}

// DELETE POST
async function deletePost(req, res) {
  try {
    const deletedPost = await postModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      success: true,
      msg: `post ${req.params.id} is deleted succesfully`,
      post: deletedPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Delete NotFound',
    });
  }
}

module.exports = { getPostById, getAllPost, addPost, editPost, deletePost };
