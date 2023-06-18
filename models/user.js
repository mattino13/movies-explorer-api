const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Укажите имя'],
      minlength: [2, 'Слишком короткое имя. Минимальная длина - 2 символа'],
      maxlength: [30, 'Слишком длинное имя. Максимальная длина - 30 символов'],
    },
    email: {
      type: String,
      required: [true, 'Укажите e-mail'],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Укажите корректный e-mail',
      },
    },
    password: {
      type: String,
      required: [true, 'Укажите пароль'],
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
