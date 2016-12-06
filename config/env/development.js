'use strict'

const winston = require('winston')

module.exports = {

  database: {

    stores: {

      postgres: {
        adapter: require('waterline-postgresql'),
        connection: {
          database: 'pp_alpha',
          host: 'localhost',
          user: 'turkeyred',
          password: '',
          port: 5432,
          ssl: false
        }
      }
    },

    models: {
      defaultStore: 'postgres',
      migrate: 'alter'
    }

  },

  log: {
    logger: new winston.Logger({
      level: 'debug',
      exitOnError: false,
      transports: [
        new winston.transports.Console({
          timestamp: true
        }),
        new winston.transports.File({
          name: 'info-file',
          level: 'debug',
          filename: 'trails-info.log',
          timestamp: true
        }),
        new winston.transports.File({
          name: 'error-file',
          level: 'error',
          filename: 'trails-error.log',
          timestamp: true
        })
      ]
    })
  }
}
