const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUserInfo,
  findMe,
} = require('../controllers/users');

usersRouter.get('/me', findMe);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  updateUserInfo,
);

module.exports = usersRouter;
