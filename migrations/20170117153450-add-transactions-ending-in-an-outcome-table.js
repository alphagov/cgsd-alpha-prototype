'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('transactionsendinginanoutcome', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    month_start_date: 'date',
    month_end_date: 'date',
    all_outcomes_count: 'int',
    users_intended_outcome_count: 'int',
    task: 'int',
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  });
  return null;
};

exports.down = function(db) {
  return db.dropTable('transactionsendinginanoutcome');
};

exports._meta = {
  "version": 1
};
