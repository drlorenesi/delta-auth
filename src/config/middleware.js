const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const corsOptions = {
  origin: [/127.0.0.1/, /localhost/, /auth.dev/],
  credentials: true,
};

module.exports = (app) => {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.static('./src/public'));
  app.use(cookieParser());
  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(compression());
  }
};
