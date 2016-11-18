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
   * Get total transactions received by department
   */
  getTransactionsReceivedByDept() {
    return this.app.orm.Department.query(
      "SELECT department.friendly_id, \
              department.name, \
              SUM(taskvolumerecord.count) as total_received \
       FROM department \
       INNER JOIN task \
       INNER JOIN taskvolumerecord \
       WHERE task.department = department.id \
       AND taskvolumerecord.task = task.id \
       AND taskvolumerecord.stage = 'received' \
       GROUP BY department.name \
       ORDER BY total_received DESC",
      []
    );
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
       INNER JOIN agency \
       INNER JOIN task \
       INNER JOIN taskvolumerecord \
       WHERE department.friendly_id = $1 \
       AND agency.department = department.id \
       AND task.agency = agency.id \
       AND taskvolumerecord.task = task.id \
       AND taskvolumerecord.stage = 'received' \
       GROUP BY agency.name \
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
       INNER JOIN task \
       INNER JOIN taskvolumerecord \
       WHERE department.friendly_id = $1 \
       AND task.department = department.id \
       AND taskvolumerecord.task = task.id \
       AND taskvolumerecord.stage = 'received' \
       GROUP BY task.name \
       ORDER BY total_received DESC",
      [friendly_id]
    );
  }
}
