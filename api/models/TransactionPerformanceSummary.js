'use strict';

module.exports = class TransactionPerformanceSummary {
  constructor(transaction_volume_records) {
   this._transaction_volume_records = transaction_volume_records;
  }

  get total_volume() {
    var i, sum = 0;

    for (i = 0; i < this._transaction_volume_records.length; i++) {
      sum += this._transaction_volume_records[i].count;
    }

    return sum;
  }
}
