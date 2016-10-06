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
      friendly_id: {
        type: 'string'
      },
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
      department: {
        model: 'Department'
      },
      tasks: {
        collection: 'Task',
        via: 'agency'
      }
    }
  }
}
