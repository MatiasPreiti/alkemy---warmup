const express = require('express');
const morgan = require('morgan');
const slash = require('express-slash');

const { postRouter } = require('./router/post.router');
const { categoryRouter } = require('./router/category.router');
const { sequelize } = require('./models/index');

// Error handlers
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
postRouter(app);
categoryRouter(app);

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  sequelize.sync({ force: true }).then(() => {
    console.log('Database is connected');
  });
});

module.exports = app;
