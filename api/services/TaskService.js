'use strict'

const Service = require('trails-service')

/**
 * @module TaskService
 * @description Useful services for tasks
 */
module.exports = class TaskService extends Service {
  /**
   * Find a task by its friendly_id
   */
  getTaskByFriendlyId(friendly_id) {
    return this.app.orm.Task.findOne({
      friendly_id: friendly_id }).populate('agency').populate('department')
  }

  /**
   * Sum transactions ending in an outcome
   */
  sumTransactionsWithOutcome(friendly_id) {
    return this.app.orm.Task.query(
      "SELECT SUM(transactionsendinginanoutcome.all_outcomes_count) \
       FROM task \
       INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
       WHERE task.friendly_id = $1",
      [friendly_id]
    );
  }

  /**
   * Sum transactions ending in an outcome
   */
  sumTransactionsWithUsersIntendedOutcome(friendly_id) {
    return this.app.orm.Task.query(
      "SELECT SUM(transactionsendinginanoutcome.users_intended_outcome_count) \
       FROM task \
       INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
       WHERE task.friendly_id = $1",
      [friendly_id]
    );
  }
}
