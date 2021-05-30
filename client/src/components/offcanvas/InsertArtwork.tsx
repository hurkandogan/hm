import React, { useState } from 'react';
import api from '../../connection/common_http';

import { slide as Menu } from 'react-burger-menu';

const InsertArtwork = (props) => {

    const ARTWORK_INITIAL_VALUE = {
        artwork_name: "",
        artist_name: "",
        sizes: "",
        location: "",
        purchase_date: "",
        purchase_location: "",
        price: "",
        tax_price: "",
        transport_price: "",
        arr: 0,
        framing: "",
        artwork_desc: "",
        notes:"",
    };

    const [loading, setLoading] = useState(false);
    const [artwork, setArtwork] = useState(ARTWORK_INITIAL_VALUE);

    const changeHanler = event => {
        const { name, value } = event.target;
        setArtwork({ ...artwork, [name]: value });
    };
    
    const submitArtwork = async (e) => {
        e.preventDefault();
        setLoading(true);
        await api.post("/api/artwork", artwork)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        setArtwork(ARTWORK_INITIAL_VALUE);
        setLoading(false);
        props.offCanvasHandler();
    }

    return (
        <Menu
            width={'50%'}
            isOpen={props.offCanvasToggle}
            onClose={props.offCanvasHandler}
            right
        >
            <h3>Add new Artwork</h3>
            <form onSubmit={submitArtwork}>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="artwork_name">Artwork Name</label>
                        <input type="text"
                            className="form-control"
                            name="artwork_name"
                            id="artwork_name"
                            placeholder="Artwork Name"
                            autoComplete="off"
                            value={artwork.artwork_name}
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="artist_name">Artist Name</label>
                        <input type="text"
                            className="form-control"
                            name="artist_name"
                            id="artist_name"
                            placeholder="Artist Name"
                            autoComplete="off"
                            value={artwork.artist_name}
                            onChange={changeHanler} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="sizes">Sizes</label>
                        <input type="text"
                            className="form-control"
                            name="sizes"
                            id="sizes"
                            placeholder="Sizes"
                            autoComplete="off"
                            value={artwork.sizes}
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="location">Location</label>
                        <input type="text"
                            className="form-control"
                            name="location"
                            id="location"
                            placeholder="Location"
                            autoComplete="off"
                            value={artwork.location}
                            onChange={changeHanler} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="purchase_date">Purchase Date</label>
                        <input type="date"
                            className="form-control"
                            name="purchase_date"
                            id="purchase_date"
                            placeholder="Purchase Date"
                            autoComplete="off"
                            value={artwork.purchase_date}
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="purchase_location">Location of purchase</label>
                        <input type="text"
                            className="form-control"
                            name="purchase_location"
                            id="purchase_location"
                            placeholder="Location of purchase"
                            autoComplete="off"
                            value={artwork.purchase_location}
                            onChange={changeHanler} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="price">Price in €</label>
                        <input type="text"
                            className="form-control"
                            name="price"
                            id="price"
                            placeholder="Price in €"
                            autoComplete="off"
                            value={artwork.price}
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="tax_price">Tax Cost</label>
                        <input type="text"
                            className="form-control"
                            name="tax_price"
                            id="tax_price"
                            placeholder="Tax"
                            autoComplete="off"
                            value={artwork.tax_price}
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="transport_price">Transport Cost</label>
                        <input type="text"
                            className="form-control"
                            name="transport_price"
                            id="transport_price"
                            placeholder="Transport Cost"
                            autoComplete="off"
                            value={artwork.transport_price}
                            onChange={changeHanler} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="framing">Framing Cost</label>
                        <input type="text"
                            className="form-control"
                            name="framing"
                            id="framing"
                            placeholder="Framing Cost"
                            autoComplete="off"
                            value={artwork.framing}
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="arr">ARR</label>
                        <select className="form-control"
                            name="arr"
                            id="arr"
                            placeholder="ARR"
                            autoComplete="off"
                            value={artwork.arr}
                            onChange={changeHanler}>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="artwork_desc">Artwork Description</label>
                        <textarea className="form-control"
                            name="artwork_desc"
                            id="artwork_desc"
                            value={artwork.artwork_desc}
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="notes">Notes</label>
                        <textarea className="form-control"
                            name="notes"
                            id="notes"
                            value={artwork.notes}
                            onChange={changeHanler} />
                    </div>
                </div>
                <button className="btn btn-primary mt-3" disabled={loading}>
                    Save
                    {loading && (
                        <div className="spinner-border text-light" role="status">
                            <span className="sr-only"></span>
                        </div>
                    )}
                </button>
            </form>
        </Menu>
    );
};

export default InsertArtwork;