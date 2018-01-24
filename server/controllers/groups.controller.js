var config = require('config.json');
var express = require('express');
var router = express.Router();
var groupService = require('services/group.service');

// routes
router.post('/create', createGroup);
router.get('/', getAll);
router.get('/:_id', getById);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function createGroup(req, res) {
    groupService.create(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    groupService.getAll()
        .then(function (groups) {
            res.send(groups);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    groupService.getById(req.group.id)
        .then(function (group) {
            if (group) {
                res.send(group);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    groupService.update(req.params._id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    groupService.delete(req.params._id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}