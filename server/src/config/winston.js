const winston = require('winston');
require('winston-mongodb')

const levels = {
  error: 0,
  info: 1,
};

const colors = {
  error: 'red',
  info: 'green'
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss:ms'
  }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), format),
  }),
  new winston.transports.MongoDB({
    db: process.env.mongoURL,
    options: {
      useUnifiedTopology: true
    },
    collection: 'loggers_info',
    level: 'info'
  }),
  new winston.transports.MongoDB({
    db: process.env.mongoURL,
    options: {
      useUnifiedTopology: true
    },
    collection: 'loggers_error',
    level: 'error'
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({
    filename: 'logs/info.log',
    level: 'info',
  }),
];

const logger = winston.createLogger({
  levels,
  format,
  transports,
});

module.exports = logger;