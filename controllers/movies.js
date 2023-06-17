const Movies = require('../models/movies');
const { NotFoundError, ForbiddenError } = require('../utils/errors');
const { CREATED_HTTP_STATUS } = require('../utils/consts');

function findMovies(req, res, next) {
  Movies.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
}

function addMovie(req, res, next) {
  Movies.create({
    owner: req.user._id,
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
  })
    .then((movie) => { res.status(CREATED_HTTP_STATUS).send(movie); })
    .catch(next);
}

function deleteMovie(req, res, next) {
  Movies.findById(req.params.id)
    .orFail(() => { throw new NotFoundError('Фильм не найден'); })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        movie.deleteOne()
          .then(() => res.send({ message: 'Фильм удален из избранного' }))
          .catch(next);
      } else {
        throw new ForbiddenError('Удалять чужие фильмы из избранного запрещено');
      }
    })
    .catch(next);
}

module.exports = {
  findMovies, addMovie, deleteMovie,
};
