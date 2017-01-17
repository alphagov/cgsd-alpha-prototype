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
       INNER JOIN task ON task.department = department.id \
       INNER JOIN taskvolumerecord ON taskvolumerecord.task = task.id \
       GROUP BY department.friendly_id, department.name \
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
}
