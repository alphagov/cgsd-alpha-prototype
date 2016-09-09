'use strict'

const Model = require('trails-model')

/**
 * @module Department
 * @description GovUK department object
*/
module.exports = class Department extends Model {

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
      agencies: {
        collection: 'Agency',
        via: 'department'
      },
      tasks: {
        collection: 'Task',
        via: 'department'
      }
    }
  }
}
