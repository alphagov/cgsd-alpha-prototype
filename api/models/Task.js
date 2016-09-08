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
      // associations
      transaction_volume_records: {
        collection: 'TaskVolumeRecord',
        via: 'task'
      }
    }
  }
}
