const path = require('path')
const pkg = require('./package')
const winston = require('winston')


const format = !process.env.CI ? 
winston.format.combine(
  winston.format.splat(),
  winston.format.simple(),
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf(info => `${pkg.name}: ${info.timestamp} ${info.level}: ${info.message}`)) :
winston.format.combine(
  winston.format.splat(),
  winston.format.simple(),
  winston.format.timestamp(),
  winston.format.printf(info => `${pkg.name}: ${info.timestamp} ${info.level}: ${info.message}`)
);


const logger = winston.createLogger({
  format: format,
  transports: [new winston.transports.Console()]
})

const loggerWrapper = (absoluteFilePath) => {
  const file = path.relative(__dirname, absoluteFilePath)
  // Because this file is in the source code root folder, the above will make all paths relative to it: just the info needed for the log.

  return {
    info: (message) => logger.info(`[${file}] ${message}`),
    warn: (message) => logger.warn(`[${file}] ${message}`),
    error: (message, error) => logger.error(`[${file}] ${message}${error && error.stack ? error.stack : (error || '')}`),
    stopLogging: () => {
      logger.silent = true
    }
  }
}

module.exports = loggerWrapper
