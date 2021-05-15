import React, {useState} from 'react';
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
        arr: "",
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

    const submitArtwork = e => {
        e.preventDefault();
        setLoading(true);
        console.log(artwork);
        setLoading(false);
        setArtwork(ARTWORK_INITIAL_VALUE);
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
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="artwork_name">Artist Name</label>
                        <input type="text"
                            className="form-control"
                            name="artist_name"
                            id="artist_name"
                            placeholder="Artist Name"
                            autoComplete="off"
                            onChange={changeHanler} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="artwork_name">Sizes</label>
                        <input type="text"
                            className="form-control"
                            name="sizes"
                            id="sizes"
                            placeholder="Sizes"
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="artwork_name">Location of purchase</label>
                        <input type="text"
                            className="form-control"
                            name="location"
                            id="location"
                            placeholder="Location of purchase"
                            autoComplete="off"
                            onChange={changeHanler} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="artwork_name">Purchase Date</label>
                        <input type="text"
                            className="form-control"
                            name="purchase_date"
                            id="purchase_date"
                            placeholder="Purchase Date"
                            autoComplete="off"
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="artwork_name">Location of purchase</label>
                        <input type="text"
                            className="form-control"
                            name="purchase_location"
                            id="purchase_location"
                            placeholder="Location of purchase"
                            autoComplete="off"
                            onChange={changeHanler} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="artwork_name">Price in €</label>
                        <input type="text"
                            className="form-control"
                            name="price"
                            id="price"
                            placeholder="Price in €"
                            autoComplete="off"
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="artwork_name">Tax Cost</label>
                        <input type="text"
                            className="form-control"
                            name="tax_price"
                            id="tax_price"
                            placeholder="Tax"
                            autoComplete="off"
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="artwork_name">Transport Cost</label>
                        <input type="text"
                            className="form-control"
                            name="transport_price"
                            id="transport_price"
                            placeholder="Transport"
                            autoComplete="off"
                            onChange={changeHanler} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="artwork_name">ARR</label>
                        <input type="text"
                            className="form-control"
                            name="arr"
                            id="arr"
                            placeholder="ARR"
                            autoComplete="off"
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="artwork_name">Framing Cost</label>
                        <input type="text"
                            className="form-control"
                            name="framing"
                            id="framing"
                            placeholder="Transport"
                            autoComplete="off"
                            onChange={changeHanler} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <label htmlFor="artwork_desc">Artwork Description</label>
                        <textarea className="form-control"
                            name="artwork_desc"
                            id="artwork_desc"
                            onChange={changeHanler} />
                    </div>
                    <div className="col">
                        <label htmlFor="artwork_name">Notes</label>
                        <textarea className="form-control"
                            name="notes"
                            id="notes"
                            onChange={changeHanler} />
                    </div>
                </div>
                <button className="btn btn-primary mt-3">Save</button>
            </form>
        </Menu>
    );
};

export default InsertArtwork;