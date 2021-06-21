const db = require('../model/connection');
const pagination = require('../helpers/pagination');
const Artwork = db.artwork;

exports.createArtwork = (req, res) => {

    if (!req.body.artwork_name) {
        res.status(400).send({
            result: "FAILED",
            message: "Name property cannot be empty."
        });
        return;
    }

    const newArtwork = {    
         id: null,
         artwork_name: req.body.artwork_name,
         artist_name: req.body.artist_name,
         sizes: req.body.sizes,
         location: req.body.location,
         purchase_date: req.body.purchase_date,
         purchase_location: req.body.purchase_location,
         price: parseFloat(req.body.price),
         tax_price: parseFloat(req.body.tax_price),
         transport_price: parseFloat(req.body.transport_price),
         framing: parseFloat(req.body.framing),
         arr: req.body.arr,
         artwork_desc: req.body.artwork_desc,
         notes: req.body.notes,
    }
    
    Artwork.create(newArtwork)
        .then(response => {
            res.status(200).send({
                result: "SUCCESS",
                message: "New Cost Type created",
                payload: JSON.stringify(response)
            });
        })
        .catch((err) => {
            res.status(500).send({
                result: "FAILED",
                message: "artwork.controller#create=> An error occured: " + err
            });
        });
};

exports.selectArtworks = (req, res) => {
    // const {
    //     limit,
    //     offset
    // } = pagination.getPagination(page, rowsPerPage);
    Artwork.findAndCountAll({
        order: [
                ['purchase_date', 'ASC'],
                ['createdAt', 'DESC']
            ],
            // limit,
            // offset
    })
        .then(response => {
            res.status(200).send({
                result: "SUCCESS",
                payload: response
            })
        });
};

exports.updateArtwork = (req, res) => {

     if (!req.body.id || req.body.id === "") {
         res.status(400).send({
             result: "FAILED",
             message: "Artwork id: " + req.body.id + " is not valid!"
         });
     }

    const artwork = {
        id: req.body.id,
        artwork_name: req.body.artwork_name,
        artist_name: req.body.artist_name,
        sizes: req.body.sizes,
        location: req.body.location,
        purchase_date: req.body.purchase_date,
        purchase_location: req.body.purchase_location,
        price: req.body.price,
        tax_price: req.body.tax_price,
        transport_price: req.body.transport_price,
        framing: req.body.framing,
        arr: req.body.arr,
        artwork_desc: req.body.artwork_des,
        notes: req.body.notes
    }

    Artwork.update(artwork, {
        where: {
            id: artwork.id
        }
    })
        .then(response => {
            res.status(200).send({
                result: "SUCCESS",
                payload: response
            })
        })
        .catch(err => {
            res.status(500).send({
                result: "FAILED",
                message: "An error occured!"
            })
        });
};

// TODO: Implementations
exports.selectOneArtwork = (req, res) => { };
exports.deleteArtwork = (req, res) => { };
exports.soldArtwork = (req, res) => { };
