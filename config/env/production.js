'use strict'

const winston = require('winston')

module.exports = {

  trailpack: {
    disabled: [
      'repl'
    ]
  },

  database : {

    stores: {

      postgres: {
        adapter: require('waterline-postgresql'),
        connection: {
          database: 'pp-alpha',
          host: 'localhost',
          user: 'turkeyred',
          password: '',
          port: 5432,
          ssl: false,
          migrate: 'create'
        }
      }
    },

    models: {
      defaultStore: 'postgres',
      migrate: 'create'
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
          level: 'info',
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
