const userController = require('../controllers/users');
const { validateAccessToken } = require('../middlewares/valideteToken');

module.exports = (app) => {
  //listado de post por fecha de creacion decendiente (solo id title imagen categoria y creacion)
  app.get('/');
  // buscar por ID - sino error
  app.get('/:id');
  //guardar nuevo post
  app.post('/');
  //actualizar por por Id - sino error
  app.patch('/:id');
  //elimitar post por ID
  app.delete('/:id');
};
