const db = require('../model/connection');
const CostType = db.costTypes;

// Insert
exports.createCostTypes = (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: "Name property cannot be empty."
        });
        return;
    }

    const data = {
        name: req.body.name,
        objectType: req.body.objectType
    };

    CostType.create(data)
        .then((data) => {
            res.status(200).send("New Cost Type created: " + JSON.stringify(data, null, 4));

        })
        .catch((err) => {
            res.status(500).send({
                message: "costTypes.controller#create=> An error occured: " + err
            });
        });
};

// Query
exports.getAllCostTypes = (req, res) => {
    CostType.findAll({
        attributes: [
            'id',
            'name',
            'objectType'
        ]
    })
        .then( data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "costTypes.controller#get=> An error occured: " + err
            });
        });
};