'use strict'

const Model = require('trails-model')

/**
 * @module TransactionVolumeRecord
 * @description GovUK Transaction Volume Record object
*/
module.exports = class TransactionVolumeRecord extends Model {

  static config () {
  }

  static schema () {
    return {
      month_start_date: {
        type: 'date'
      },
      month_end_date: {
        type: 'date'
      },
      transaction_status: {
        type: 'string'
      },
      count: {
        type: 'integer'
      }
    }
  }
}
