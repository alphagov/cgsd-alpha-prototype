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
}

