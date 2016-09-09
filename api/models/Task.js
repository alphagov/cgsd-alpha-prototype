'use strict'

const Model = require('trails-model')

/**
 * @module Task
 * @description Service Task
 */
module.exports = class Task extends Model {

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
      // associations
      transaction_volume_records: {
        collection: 'TaskVolumeRecord',
        via: 'task'
      }
    }
  }
}
