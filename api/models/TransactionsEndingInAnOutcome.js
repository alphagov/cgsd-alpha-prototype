'use strict'

const Model = require('trails-model')

/**
 * @module TransactionsEndingInAnOutcome
 * @description Monthly summary of transactions ending in an outcome
 */
module.exports = class TransactionsEndingInAnOutcome extends Model {

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
      all_outcomes_count: {
        type: 'integer'
      },
      users_intended_outcome_count: {
        type: 'integer'
      },
      // associations
      task: {
        model: 'Task'
      }
    }
  }
}
