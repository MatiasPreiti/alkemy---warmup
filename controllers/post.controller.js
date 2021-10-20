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
