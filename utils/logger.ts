import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  exitOnError: false,
  format: format.combine(
    format.colorize(),
    format.simple(),
  ),
  transports: [
    new transports.Console(),
  ],
});

export { logger };