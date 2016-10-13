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
        "select department.friendly_id, department.name, sum(taskvolumerecord.count) as total_received from department inner join task inner join taskvolumerecord where task.department = department.id and   taskvolumerecord.task = task.id and   taskvolumerecord.stage = 'received' group by department.name order by total_received DESC",
        []
    );
  }
}
