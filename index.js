const express = require('express');
const morgan = require('morgan');

const slash = require('express-slash');

const postRoutes = require('./router/post.router');

const {
  errorHandler,
  wrapErrors,
  logErrors,
} = require('./middlewares/errorHandlers');
const { notFoundHandler } = require('./middlewares/notFoundHandlers');

// Set up express app
const app = express();

app.use(morgan('dev'));
app.use(express.json());

//router.
const router = express.Router({
  caseSensitive: app.get('case sensitive routing'),
  strict: app.get('strict routing'),
});
router.use('/post', postRoutes);

app.use(slash());

// Catch error 404
app.use(notFoundHandler);

// Error handlers midldlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

//port implementation
const port = parseInt(process.env.PORT) || 8000;
app.set('port', port);
app.listen(port, () => console.log('app escuchando en puerto ' + port));

module.exports = app;
