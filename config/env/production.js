'use strict'

const winston = require('winston')

var vcap_services = JSON.parse(process.env.VCAP_SERVICES)

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
          database: vcap_services.postgres[0].credentials.name,
          host: vcap_services.postgres[0].credentials.host,
          user: vcap_services.postgres[0].credentials.username,
          password: vcap_services.postgres[0].credentials.password,
          port: 5432,
          ssl: true
        }
      }
    },

    models: {
      defaultStore: 'postgres',
      migrate: 'safe'
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
