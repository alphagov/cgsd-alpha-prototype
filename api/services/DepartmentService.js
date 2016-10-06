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
      friendly_id: friendly_id }).populate('agencies').populate('tasks')
  }
}

