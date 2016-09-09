'use strict'

const Model = require('trails-model')

/**
 * @module Agency
 * @description GovUK agency object
 */
module.exports = class Agency extends Model {

  static config () {
  }

  static schema () {
    return {
      name: {
        type: 'string'
      },
      description: {
        type: 'text'
      },
      url: {
        type: 'string'
      },
      // associations
      tasks: {
        collection: 'Task',
        via: 'agency'
      }
    }
  }
}
