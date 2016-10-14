'use strict'

const Service = require('trails-service')

/**
 * @module TaskVolumeRecordService
 * @description Useful services for task volume records
 */
module.exports = class TaskVolumeRecordService extends Service {
  /**
   * Get task volumes by task
   */
  getTotalVolumeByTask(task_ids) {
    return this.app.orm.TaskVolumeRecord.query(
      "SELECT *  from taskvolumerecord WHERE task IN (" + task_ids.join() + ")",
      []
    );
  }
}
