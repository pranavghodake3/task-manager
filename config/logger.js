const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  //   level: 'info',
  //   format: format.json(),
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.colorize(),
  ),
  //   defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new transports.File({ filename: 'logs/combined.log', level: 'info' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  //   logger.add(new transports.Console({
  //     format: format.simple(),
  //   }));
  logger.add(
    new transports.Console({
      format: format.combine(
        // format.colorize(),
        format.simple(),
      ),
    }),
  );
}

module.exports = logger;
