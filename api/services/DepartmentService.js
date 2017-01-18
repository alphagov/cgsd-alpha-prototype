'use strict'

const Service = require('trails-service')

/**
 * @module DepartmentService
 * @description Useful services for departments
 */
module.exports = class DepartmentService extends Service {
  /**
   * Find a department by its friendly_id
   */
  getDepartmentByFriendlyId(friendly_id) {
    return this.app.orm.Department.findOne({
      friendly_id: friendly_id })
      .populate('agencies', { sort: 'name ASC'})
      .populate('tasks', { sort: 'name ASC'})
  }

  /**
   * Get total transactions received by agency
   */
  getTransactionsReceivedByAgency(friendly_id) {
    return this.app.orm.Department.query(
      "SELECT agency.friendly_id, \
              agency.name, \
              SUM(taskvolumerecord.count) as total_received \
       FROM department \
       INNER JOIN agency ON agency.department = department.id \
       INNER JOIN task ON task.agency = agency.id \
       INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
       WHERE department.friendly_id = $1 \
       GROUP BY agency.friendly_id, agency.name \
       ORDER BY total_received DESC",
      [friendly_id]
    );
  }

  /**
   * Get total transactions received by task
   */
  getTransactionsReceivedByTask(friendly_id) {
    return this.app.orm.Task.query(
      "SELECT task.friendly_id, \
              task.name, \
              SUM(taskvolumerecord.count) as total_received \
       FROM department \
       INNER JOIN task ON task.department = department.id \
       INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
       WHERE department.friendly_id = $1 \
       GROUP BY task.friendly_id, task.name \
       ORDER BY total_received DESC",
      [friendly_id]
    );
  }

  /**
   * Sum transactions ending in an outcome
   */
  sumTransactionsWithOutcome(friendly_id) {
    return this.app.orm.Department.query(
      "SELECT SUM(transactionsendinginanoutcome.all_outcomes_count) \
       FROM department \
       INNER JOIN task ON task.department = department.id \
       INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
       WHERE department.friendly_id = $1",
      [friendly_id]
    );
  }

  /**
   * Sum transactions ending in an outcome
   */
  sumTransactionsWithUsersIntendedOutcome(friendly_id) {
    return this.app.orm.Department.query(
      "SELECT SUM(transactionsendinginanoutcome.users_intended_outcome_count) \
       FROM department \
       INNER JOIN task ON task.department = department.id \
       INNER JOIN transactionsendinginanoutcome ON transactionsendinginanoutcome.task = task.id \
       WHERE department.friendly_id = $1",
      [friendly_id]
    );
  }
}
