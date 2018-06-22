var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('groups');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.groups.find().toArray(function (err, groups) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return groups
        deferred.resolve(groups);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
    db.groups.findById(_id, function (err, group) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (group) {
            // return group
            deferred.resolve(group);
        } else {
            // group not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(groupParam) {
    var deferred = Q.defer();

    // validation
    db.groups.findOne(
        { groupname: groupParam.groupname },
        function (err, group) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (group) {
                // groupname already exists
                deferred.reject('Le groupe "' + groupParam.groupname + '" existe déjà');
            } else {
                createGroup();
            }
        });

    function createGroup() {
        // set group object to groupParam
        var group = groupParam;

        db.groups.insert(
            group,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, groupParam) {
    var deferred = Q.defer();

    // validation
    db.groups.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (group.groupname !== groupParam.groupname) {
            // groupname has changed so check if the new groupname is already taken
            db.groups.findOne(
                { groupname: groupParam.groupname },
                function (err, group) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (group) {
                        // groupname already exists
                        deferred.reject('Le groupe "' + req.body.groupname + '" existe déjà')
                    } else {
                        updateGroup();
                    }
                });
        } else {
            updateGroup();
        }
    });

    function updateGroup() {
        // fields to update
        var set = {
            adminname: groupParam.adminname,
            groupname: groupParam.groupname
        };

        db.groups.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.groups.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}