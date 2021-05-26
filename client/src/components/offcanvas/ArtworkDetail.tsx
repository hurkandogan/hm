import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Moment from 'moment';

const ArtworkDetail = (props) => {

    const [showEditForm, setShowEditForm] = useState(false);

    const editFormHandler = () => setShowEditForm(!showEditForm);

    const handleOnClose = () => {
        props.offCanvasArtworkDetailHandler();
        if(showEditForm){
            editFormHandler();
        }
    };
    
    return (
        <Menu
            width={'50%'}
            isOpen={props.offCanvasArtworkDetailToggle}
            onClose={handleOnClose}
            right
        >
            <div className="container">
            <div className="row justify-content-between">
                <div className="col">
                    <h3 className="offcanvas-headline">Artwork Details</h3>
                </div>
                <div className="col-2">
                    <button className="btn btn-primary off-canvas-btn" onClick={editFormHandler}>Edit</button>
                </div>
            </div>
            </div>
            {showEditForm ? (
                <form onSubmit={props.editSelectedArtwork}>
                    <p>Edit form</p>
                    <input type="text"
                        id="id"
                        name="id"
                        value={props.selectedArtwork.id ?? ""}
                        readOnly
                        hidden />
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="artwork_name">Artwork Name</label>
                        <input type="text"
                            className="form-control"
                            name="artwork_name"
                            id="artwork_name"
                            placeholder="Artwork Name"
                            autoComplete="off"
                            value={props.selectedArtwork.artwork_name ?? ""}
                            onChange={props.editSelectedArtworkHandler} />
                    </div>
                    <div className="col">
                        <label htmlFor="artist_name">Artist Name</label>
                        <input type="text"
                            className="form-control"
                            name="artist_name"
                            id="artist_name"
                            placeholder="Artist Name"
                            autoComplete="off"
                                value={props.selectedArtwork.artist_name ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
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
                                value={props.selectedArtwork.sizes ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
                    </div>
                    <div className="col">
                        <label htmlFor="location">Location</label>
                        <input type="text"
                            className="form-control"
                            name="location"
                            id="location"
                            placeholder="Location"
                            autoComplete="off"
                                value={props.selectedArtwork.location ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
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
                                value={props.selectedArtwork.purchase_date ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
                    </div>
                    <div className="col">
                        <label htmlFor="purchase_location">Location of purchase</label>
                        <input type="text"
                            className="form-control"
                            name="purchase_location"
                            id="purchase_location"
                            placeholder="Location of purchase"
                            autoComplete="off"
                                value={props.selectedArtwork.purchase_location ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
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
                                value={props.selectedArtwork.price ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
                    </div>
                    <div className="col">
                        <label htmlFor="tax_price">Tax Cost</label>
                        <input type="text"
                            className="form-control"
                            name="tax_price"
                            id="tax_price"
                            placeholder="Tax"
                            autoComplete="off" 
                                value={props.selectedArtwork.tax_price ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
                    </div>
                    <div className="col">
                        <label htmlFor="transport_price">Transport Cost</label>
                        <input type="text"
                            className="form-control"
                            name="transport_price"
                            id="transport_price"
                            placeholder="Transport"
                            autoComplete="off"
                                value={props.selectedArtwork.transport_price ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="framing">Framing Cost</label>
                        <input type="text"
                            className="form-control"
                            name="framing"
                            id="framing"
                            placeholder="Transport"
                            autoComplete="off"
                                value={props.selectedArtwork.framing ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
                    </div>
                    <div className="col">
                        <label htmlFor="arr">ARR</label>
                        <input type="text"
                            className="form-control"
                            name="arr"
                            id="arr"
                            placeholder="ARR"
                            autoComplete="off"
                                value={props.selectedArtwork.arr ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="artwork_desc">Artwork Description</label>
                        <textarea className="form-control"
                            name="artwork_desc"
                            id="artwork_desc"
                                value={props.selectedArtwork.artwork_desc ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
                    </div>
                    <div className="col">
                        <label htmlFor="notes">Notes</label>
                        <textarea className="form-control"
                            name="notes"
                            id="notes"
                                value={props.selectedArtwork.notes ?? ""}
                                onChange={props.editSelectedArtworkHandler} />
                    </div>
                </div>
                <button className="btn btn-primary mt-3">
                    Save
                    {false && (
                        <div className="spinner-border text-light" role="status">
                            <span className="sr-only"></span>
                        </div>
                    )}
                </button>
            </form>
            ) : (
                <div>
            <div className="container">
            <img src="https://picsum.photos/100/100" alt={props.selectedArtwork.artwork_name ?? ""} />
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
        </div>
    )
}
    </Menu>
    );
};

export default ArtworkDetail;