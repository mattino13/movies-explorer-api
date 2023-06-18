const appRouter = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const { authMiddleware } = require('../middlewares/auth');

appRouter.use('/', authRouter);

appRouter.use('/movies', authMiddleware, moviesRouter);
appRouter.use('/users', authMiddleware, usersRouter);

module.exports = appRouter;
