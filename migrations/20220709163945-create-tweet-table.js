'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db, callback) {
    db.createTable('tweet', {
        id: {
            type: 'int',
            unsigned: true,
            notNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: 'int',
            unsigned: true,
            length: 10,
            notNull: true,
            foreignKey: {
                name: 'tweet_user_id_fk',
                table: 'user',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                },
                mapping: 'id'
            }
        },
        retweet_id: {
            type: 'int',
            unsigned: false,
            length: 10,
            notNull: false,
            foreignKey: {
                name: 'retweet_tweet_id_fk',
                table: 'tweet',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                },
              mapping: 'id'
            }
        },
        content: {
            type: 'string',
            length: 255
        },
        like: {
            type: 'int',
            length: 255
        },
        created_at: {
            type: 'datetime'
        },
        updated_at: {
            type: 'datetime'
        },
    }, function (err) {
        if (err) return callback(err);
        return callback();
    });

};

exports.down = function (db, callback) {
    db.dropTable('tweet', callback);
};

exports._meta = {
    "version": 1
};
