const { json } = require('body-parser');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    const result = await mongodb.getDatabase().db().collection('people').find();
    result.toArray().then((lists, err) => {
        if (err) {
            res.status(400).json({message:err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to select a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('people').find({_id: userId});
    result.toArray().then((result, err) => {
        if (err) {
            res.status(400).json({message:err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
};

const createUser = async(req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('people').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user')
    };
};

const updateUser = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favoritePokemon: req.body.favoritePokemon,
        medals: req.body.medals,
        pokedex: req.body.pokedex
    };
    const response = await mongodb.getDatabase().db().collection('people').replaceOne({_id:userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user')
    };
};

const deleteUser = async(req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('people').remove({_id:userId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user')
    };
};



module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};