const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const corsOptions = {
  origin: [
    /127.0.0.1/,
    /localhost/,
    /app.dev/,
    /granada47.com/,
    /deltacold.com/,
  ],
  credentials: true,
};

module.exports = (app) => {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  if (process.env.ENTORNO === 'desarrollo') {
    app.use(morgan('dev'));
  }
  if (process.env.ENTORNO === 'produccion') {
    app.use(helmet());
    app.use(compression());
  }
};
