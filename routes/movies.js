const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlRegex } = require('../utils/consts');
const { findMovies, addMovie, deleteMovie } = require('../controllers/movies');

moviesRouter.get('/', findMovies);

moviesRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(new RegExp(urlRegex)),
      trailerLink: Joi.string().required().pattern(new RegExp(urlRegex)),
      thumbnail: Joi.string().required().pattern(new RegExp(urlRegex)),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  addMovie,
);

moviesRouter.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().required().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = moviesRouter;
