const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const dotenv = require('dotenv');

const appRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleServerError, NotImplementedError } = require('./utils/errors');
const { corsOptions } = require('./utils/consts');
const { databaseName } = require('./utils/databaseName');

dotenv.config();
const app = express();
mongoose.connect(databaseName());

const { PORT = 3000 } = process.env;

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/', appRouter);
app.use('*', (req, res, next) => { next(new NotImplementedError('Not implemented')); });

app.use(errorLogger);
app.use(errors());
app.use((error, req, res, next) => {
  handleServerError(error, res);
  next();
});

app.listen(PORT, () => {
  console.log(`App starting on port: ${PORT}`);
  console.log(`Mode: ${process.env.NODE_ENV}`);
  console.log(`Database name: ${databaseName()}`);
});
