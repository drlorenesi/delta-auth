const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.static('./src/public'));
  app.use(cookieParser());
  app.use(cors());
  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(compression());
  }
};
