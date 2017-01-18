'use strict'

const Service = require('trails-service')

/**
 * @module AgencyService
 * @description Useful services for agencies
 */
module.exports = class AgencyService extends Service {
  /**
   * Find an agency by its friendly_id
   */
  getAgencyByFriendlyId(friendly_id) {
    return this.app.orm.Agency.findOne({
      friendly_id: friendly_id })
      .populate('tasks', { sort: 'name ASC'})
  }

  /**
   * Get total transactions received by task
   */
  getTransactionsReceivedByTask(friendly_id) {
    return this.app.orm.Task.query(
      "SELECT task.friendly_id, \
              task.name, \
              SUM(taskvolumerecord.count) as total_received \
       FROM agency \
       INNER JOIN task ON task.agency = agency.id \
       INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
       WHERE agency.friendly_id = $1 \
       GROUP BY task.friendly_id, task.name \
       ORDER BY total_received DESC",
      [friendly_id]
    );
  }

  /**
   * Sum transactions ending in an outcome
   */
  sumTransactionsWithOutcome(friendly_id) {
    return this.app.orm.Agency.query(
      "SELECT SUM(transactionsendinginanoutcome.all_outcomes_count) \
       FROM agency \
       INNER JOIN task ON task.agency = agency.id \
       INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
       WHERE agency.friendly_id = $1",
      [friendly_id]
    );
  }

  /**
   * Sum transactions ending in an outcome
   */
  sumTransactionsWithUsersIntendedOutcome(friendly_id) {
    return this.app.orm.Agency.query(
      "SELECT SUM(transactionsendinginanoutcome.users_intended_outcome_count) \
       FROM agency \
       INNER JOIN task ON task.agency = agency.id \
       INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
       WHERE agency.friendly_id = $1",
      [friendly_id]
    );
  }
}
