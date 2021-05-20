import React, { useState, useEffect } from 'react';

import { slide as Menu } from 'react-burger-menu';

const ArtworkDetail = (props) => {

    return (
        <Menu
            width={'50%'}
            isOpen={props.offCanvasArtworkDetailToggle}
            onClose={props.offCanvasArtworkDetailHandler}
            right
        >
            <h3>Artwork Details</h3>
            <div className="container">
            <div className="row mt-3">
                <div className="col">
                    <h5>Artwork Name:</h5>
                        <p className="detail-text">{ props.selectedArtwork.artwork_name ?? ""}</p>
                </div>
                <div className="col">
                    <h5>Artist Name:</h5>
                    <p className="detail-text">{props.selectedArtwork.artist_name ?? ""}</p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h5>Sizes:</h5>
                    <p className="detail-text">{props.selectedArtwork.sizes ?? ""}</p>
                </div>
                <div className="col">
                    <h5>Location:</h5>
                    <p className="detail-text">{props.selectedArtwork.location ?? ""}</p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h5>Purchase Date:</h5>
                    <p className="detail-text">{props.selectedArtwork.purchase_date ?? ""}</p>
                </div>
                <div className="col">
                    <h5>Purchase Date:</h5>
                    <p className="detail-text">{props.selectedArtwork.purchase_location ?? ""}</p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h5>Price in €:</h5>
                        <p className="detail-text">{props.selectedArtwork.price ?? 0.00}</p>
                </div>
                <div className="col">
                    <h5>Tax:</h5>
                        <p className="detail-text">{props.selectedArtwork.taxPrice ?? 0.00}</p>
                </div>
                <div className="col">
                    <h5>Transport Cost:</h5>
                        <p className="detail-text">{props.selectedArtwork.transport_price ?? 0.00}</p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h5>Framing Cost:</h5>
                    <p className="detail-text">{props.selectedArtwork.framing ?? 0.00}</p>
                </div>
                <div className="col">
                    <h5>ARR:</h5>
                    <p className="detail-text">{props.selectedArtwork.arr ?? ""}</p>
                </div>
                </div>
            <div className="row mt-3">
                <div className="col">
                    <h5>Artwork Description:</h5>
                    <p className="detail-text">{props.selectedArtwork.artwork_desc ?? 0.00}</p>
                </div>
                <div className="col">
                    <h5>Notes:</h5>
                    <p className="detail-text">{props.selectedArtwork.notes ?? 0.00}</p>
                </div>
            </div>
        </div>
    </Menu>
    );
};

export default ArtworkDetail;