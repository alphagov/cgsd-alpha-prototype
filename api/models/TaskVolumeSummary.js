'use strict';

module.exports = class TaskVolumeSummary {
  constructor(task_volume_records, tasks=[], agencies=[]) {
    this._task_volume_records = task_volume_records;
    this._tasks = tasks;
    this._agencies = agencies;

    this._total_received = 0;
    var i;
    for (i = 0; i < this._task_volume_records.length; i++) {
      this._total_received += this._task_volume_records[i].count;
    }

    this._received_online = this._sum_received_volume_for('online');
    this._received_paper = this._sum_received_volume_for('paper');
    this._received_phone = this._sum_received_volume_for('phone');
  }

  get total_received() {
    return this._total_received;
  }

  get received_online() {
    return this._received_online;
  }

  get received_online_pct_total() {
    return Math.floor((this.received_online / this.total_received) * 100);
  }

  get received_paper() {
    return this._received_paper;
  }

  get received_paper_pct_total() {
    return Math.floor((this.received_paper / this.total_received) * 100);
  }

  get received_phone() {
    return this._received_phone;
  }

  get received_phone_pct_total() {
    return Math.floor((this.received_phone / this.total_received) * 100);
  }

  tasks() {
    var task_volumes = [];
    var x;
    for (x = 0; x < this._tasks.length; x++) {
      var y, sum = 0;
      for (y = 0; y < this._task_volume_records.length; y++) {
        var record;
        record = this._task_volume_records[y];
        if (record.task == this._tasks[x].id && record.stage == 'received') {
          sum += record.count;
        }
      }
      task_volumes.push({ friendly_id: this._tasks[x].friendly_id, name: this._tasks[x].name, total_received: sum });
    }
    return task_volumes;
  }

  agencies() {
    var agency_volumes = [];
    var z;
    for (z = 0; z < this._agencies.length; z++) {
      var agency = this._agencies[z];
      var sum = 0;
      var x;
      for (x = 0; x < this._tasks.length; x++) {
        var y;
        for (y = 0; y < this._task_volume_records.length; y++) {
          var record;
          record = this._task_volume_records[y];
          if (this._tasks[x].agency == agency.id && record.task == this._tasks[x].id && record.stage == 'received') {
            sum += record.count;
          }
        }
      }
      agency_volumes.push({ friendly_id: this._agencies[z].friendly_id, name: this._agencies[z].name, total_received: sum });
    }
    return agency_volumes;
  }

  // private functions

  _sum_received_volume_for(channel) {
    var i, sum = 0;
    for (i = 0; i < this._task_volume_records.length; i++) {
      var record;
      record = this._task_volume_records[i];
      if (record.channel == channel && record.stage == 'received') {
        sum += record.count;
      }
    }

    return sum;
  }
}
