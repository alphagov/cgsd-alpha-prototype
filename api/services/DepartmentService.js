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
}
