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
    this._received_face_to_face = this._sum_received_volume_for('face to face');
    this._received_other = this._sum_received_volume_for('other');
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

  get received_face_to_face() {
    return this._received_face_to_face;
  }

  get received_face_to_face_pct_total() {
    return Math.floor((this.received_face_to_face / this.total_received) * 100);
  }

  get received_other() {
    return this._received_other;
  }

  get received_other_pct_total() {
    return Math.floor((this.received_other / this.total_received) * 100);
  }

  // private functions

  _sum_received_volume_for(channel) {
    var i, sum = 0;
    for (i = 0; i < this._task_volume_records.length; i++) {
      var record;
      record = this._task_volume_records[i];
      if (record.channel == channel) {
        sum += record.count;
      }
    }

    return sum;
  }
}
