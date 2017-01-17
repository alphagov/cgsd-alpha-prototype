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
}
