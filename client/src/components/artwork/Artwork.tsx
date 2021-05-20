import React, { useState, useEffect } from 'react';
import api from '../../connection/common_http';
import InsertArtwork from '../offcanvas/InsertArtwork';
import ArtworkDetail from '../offcanvas/ArtworkDetail';
import {
    BsPlusSquare
    } from 'react-icons/bs';

const Artwork = () => {

    const [artworks, setArtworks] = useState<any[]>([]);
    const [artworkCount, setArtworkCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [offCanvasToggle, setOffCanvasToggle] = useState(false);
    const [offCanvasArtworkDetailToggle, setOffCanvasArtworkDetailToggle] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState({} || null);
    
    const ARTWORK_INITIAL_VALUE = {
        artwork_name: "",
        artist_name: "",
        sizes: "",
        location: "",
        purchase_date: "",
        purchase_location: "",
        price: "",
        taxPrice: "",
        transport_price: "",
        arr: "",
        framing: "",
        artwork_desc: "",
        notes: "",
    };

    useEffect(() => {
        setLoading(true);
        setSelectedArtwork(ARTWORK_INITIAL_VALUE);
        api.get('/api/artwork')
            .then(response => {
                setArtworks(response.data.payload.rows);
                setArtworkCount(response.data.payload.count);
            })
            .catch(err => console.log(err));
        setLoading(false);
    }, []);

    
    const offCanvasHandler = async () => setOffCanvasToggle(!offCanvasToggle);
    const offCanvasArtworkDetailHandler = async (value) => {
        setSelectedArtwork(value ?? {});
        setOffCanvasArtworkDetailToggle(!offCanvasArtworkDetailToggle);
    };

    return (
        <div className="content-wrapper">
            <InsertArtwork
                offCanvasToggle={offCanvasToggle}
                offCanvasHandler={offCanvasHandler} />
            <ArtworkDetail
                offCanvasArtworkDetailToggle={offCanvasArtworkDetailToggle}
                offCanvasArtworkDetailHandler={offCanvasArtworkDetailHandler}
                selectedArtwork={selectedArtwork}
            />
            <div className="content-header">
                <div className="container-fluid">
                    <h1>Artwork</h1>
                    <button className="btn btn-primary" onMouseUp={offCanvasHandler}><BsPlusSquare /></button>
                    <table className="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Artwork</th>
                                <th scope="col">Artist</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artworks &&
                                artworks.map((el) => {
                                return (
                                        <tr key={el.id} onMouseUp={() => offCanvasArtworkDetailHandler(el)}>
                                        <th scope="row">No Image</th>
                                        <td>{el.artwork_name}</td>
                                        <td>{el.artist_name}</td>
                                        <td>{el.price} €</td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    );
};

export default Artwork;