const db = require('../model/connection');
const pagination = require('../helpers/pagination');
const Artwork = db.artwork;

exports.createArtwork = (req, res) => {

    if (!req.body.artworkName) {
        res.status(400).send({
            result: "FAILED",
            message: "Name property cannot be empty."
        });
        return;
    }

    const newArtwork = {    
         id: null,
         artwork_name: req.body.artworkName,
         artist_name: req.body.artistName,
         sizes: req.body.sizes,
         location: req.body.location,
         purchase_date: req.body.purchaseDate,
         purchase_location: req.body.purchaseLocation,
         price: parseFloat(req.body.price),
         tax_price: parseFloat(req.body.taxPrice),
         transport_price: parseFloat(req.body.transportPrice),
         framing: parseFloat(req.body.framing),
         arr: req.body.arr,
         artwork_desc: req.body.artworkDesc,
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
                message: "costTypes.controller#create=> An error occured: " + err
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
    console.log(req.body);
};

// TODO: Implementations
exports.selectOneArtwork = (req, res) => { };
exports.deleteArtwork = (req, res) => { };
