const db = require('../model/connection');
const Object = db.objects;

exports.getAllObjects = (req, res) => {
    console.log(req.headers);
    Object.findAll()
        .then( data => res.status(200).send(data))
        .catch(err => {
            res.status(500).send({
                message: "object.controller#getAllObjects: " + err
            });
        });
};

exports.getSingleObject = (req, res) => {
    const id = req.params.id;
    //TODO: Implementation
};
exports.createObject = (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: "Name property cannot be empty."
        });
        return;
    }

    const data = {
        name: req.body.name,
        adresse: req.body.adresse,
        objectType: req.body.objectType
    };

    Object.create(data)
        .then((data) => {
        res.status(200).send("New object created: " + JSON.stringify(data, null, 4));

    })
        .catch((err) => {
            res.status(500).send({
                message: "An error occured: " + err
            });
        });
};

exports.updateObject = (req, res) => {
    const id = req.params.id;
    //TODO: Implementation
};

exports.deleteObject = (req, res) => {
    const id = req.params.id;
    Object.destroy({ where: { id: id }})
    .then(data => {
        if(data){
            res.status(200).send({
                message: 'Object is succesfully deleted.'
            });
        } else {
            res.status(404).send({
                message: 'Object is not found.'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 'An error occured with deleting: ' +err
        });
    });
};