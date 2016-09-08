'use strict';

module.exports = class TaskVolumeSummary {
  constructor(task_volume_records) {
   this._task_volume_records = task_volume_records;
  }

  get total_volume() {
    var i, sum = 0;

    for (i = 0; i < this._task_volume_records.length; i++) {
      sum += this._task_volume_records[i].count;
    }

    return sum;
  }
}
