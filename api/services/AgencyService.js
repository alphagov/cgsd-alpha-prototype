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
       INNER JOIN task \
       INNER JOIN taskvolumerecord \
       WHERE agency.friendly_id = $1 \
       AND task.agency = agency.id \
       AND taskvolumerecord.task = task.id \
       AND taskvolumerecord.stage = 'received' \
       GROUP BY task.name \
       ORDER BY total_received DESC",
      [friendly_id]
    );
  }
}
