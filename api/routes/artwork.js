const express = require('express');
const router = express.Router();
const Artwork = require('../controller/artwork.controller');
const auth = require('../authorization/verifyUser');

module.exports = function (app) {
    app.all("/api/artwork*", auth.verifyToken, function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/artwork', Artwork.createArtwork);
    app.get('/api/artwork', Artwork.selectArtworks);
    app.put('/api/artwork', Artwork.updateArtwork);
};