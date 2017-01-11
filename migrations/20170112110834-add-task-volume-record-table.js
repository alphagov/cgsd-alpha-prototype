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
  return db.createTable('taskvolumerecord', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    month_start_date: 'date',
    month_end_date: 'date',
    channel: 'string',
    stage: 'string',
    count: 'int',
    task: 'int',
    createdAt: 'timestamp',
    updatedAt: 'timestamp'
  });
};

exports.down = function(db) {
  return db.dropTable('taskvolumerecord');
};

exports._meta = {
  "version": 1
};
