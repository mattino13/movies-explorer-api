const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    country: {
      type: String,
      required: [true, 'Укажите страну создания фильма'],
    },

    director: {
      type: String,
      required: [true, 'Укажите режиссёра фильма'],
    },

    duration: {
      type: Number,
      required: [true, 'Укажите длительность фильма'],
    },

    year: {
      type: String,
      required: [true, 'Укажите год выпуска фильма'],
    },

    description: {
      type: String,
      required: [true, 'Укажите описание фильма'],
    },

    image: {
      type: String,
      required: [true, 'Укажите ссылку на постер к фильму'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Укажите корректную ссылку на постер к фильму',
      },
    },

    trailerLink: {
      type: String,
      required: [true, 'Укажите ссылку на трейлер фильма'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Укажите корректную ссылку на трейлер фильма',
      },
    },

    thumbnail: {
      type: String,
      required: [true, 'Укажите миниатюрное изображение постера'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Укажите корректную ссылку на миниатюрное изображение постера',
      },
    },

    movieId: {
      type: Number,
      required: [true, 'Укажите Id фильма'],
    },

    nameRU: {
      type: String,
      required: [true, 'Укажите название фильма на русском языке'],
    },

    nameEN: {
      type: String,
      required: [true, 'Укажите название фильма на английском языке'],
    },
  },
  { versionKey: false },
);

movieSchema.index({ owner: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('movie', movieSchema);
