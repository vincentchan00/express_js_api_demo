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

exports.up = function(db, callback) {
  db.createTable('user', {
    id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: 'string',
      length: 40
    },
    password: {
      type: 'string',
      length: 100
    },
    balance: {
      type: 'string',
      length: 100
    },
    created_at: {
      type: 'datetime'
    },
  }, function(err) {
    if (err) return callback(err);
    return callback();
  });

};

exports.down = function(db,callback) {
  db.dropTable('user', callback);
};

exports._meta = {
  "version": 1
};
