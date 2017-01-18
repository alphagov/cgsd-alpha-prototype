'use strict'

const Service = require('trails-service')

/**
 * @module UKGovernmentService
 * @description Services for summarising data across UK Government
 */
module.exports = class UKGovernmentService extends Service {
  /**
   * Get total transactions received by department
   */
  sumTransactionsReceivedByDept() {
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
}
