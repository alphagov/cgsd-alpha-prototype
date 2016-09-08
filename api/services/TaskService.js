'use strict'

const Service = require('trails-service')

/**
 * @module TaskService
 * @description Useful services for tasks
 */
module.exports = class TaskService extends Service {
  /**
   * Find a task by its friendly_id
   */
  getTaskByFriendlyId(friendly_id) {
    return this.app.orm.Task.findOne({ friendly_id: friendly_id })
  }
}

