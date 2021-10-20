const { db } = require('../models/index');
const { QueryTypes } = require('sequelize');

// GET ALL POST AND GET POST BY ID
async function getpost(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      const queryResponse = await db.query(
        'SELECT id, title, image, category, creationDate FROM post',
        {
          type: QueryTypes.SELECT,
        }
      );
      res.json(queryResponse);
    }

    if (id) {
      let queryResponse = await db.query(
        'SELECT id, title, image, category, creationDate FROM post WHERE id = ?',
        {
          type: QueryTypes.SELECT,
          replacements: [id],
        }
      );
      res.json({ queryResponse });
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: 'Server internal error',
    });
  }
}

// CREATE POST
async function addPost(req, res) {
  try {
    const post = req.body;
    const { title, image, category, creationDate, text } = req.body;

    await db.query(
      'INSERT INTO post (title, image, category, creationDate, text ) VALUES (?, ?, ? ,? ,?)',
      {
        type: QueryTypes.INSERT,
        replacements: [title, image, category, creationDate, text],
      }
    );
    res.status(201).json({
      success: true,
      post: post,
      msg: `the post ${post.title} was created successfully`,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: 'Server internal error',
    });
  }
}

// PATCH POST
async function editPost(req, res) {
  try {
    const post = req.body;
    const { id } = req.params;
    const { title, image, category, creationDate, text } = req.body;

    const queryResponse = db.query(
      'UPDATE post WHERE id = ?, SET title = ?, image = ?, category = ?, creationDate = ?, text = ?)',
      {
        type: QueryTypes.UPDATE,
        replacements: [title, image, category, creationDate, text],
      }
    );
    res.status(200).json({
      success: true,
      msg: `post ${queryResponse.title} is updated succesfully`,
      post: queryResponse,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: 'Server internal error',
    });
  }
}

// DELETE POST
async function deletePost(req, res) {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM movies WHERE id = ?', {
      type: QueryTypes.DELETE,
      replacements: [id],
    });
    res.json({
      success: true,
      msg: `The post id: ${id} was deleted successfully`,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: 'Server internal error',
    });
  }
}

module.exports = { getpost, addPost, editPost, deletePost };
