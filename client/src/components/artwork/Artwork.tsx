import React, { useState, useEffect } from 'react';
import api from '../../connection/common_http';
import InsertArtwork from '../offcanvas/InsertArtwork';
import ArtworkDetail from '../offcanvas/ArtworkDetail';
import {
    BsPlusSquare,
    BsCloudDownload
    } from 'react-icons/bs';
import authService from '../../connection/auth.service';

const Artwork = () => {

    const [artworks, setArtworks] = useState<any[]>([]);
    const [artworkCount, setArtworkCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [offCanvasToggle, setOffCanvasToggle] = useState(false);
    const [offCanvasArtworkDetailToggle, setOffCanvasArtworkDetailToggle] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState({} || null);

    useEffect(() => {
        setLoading(true);
        api.get('/api/artwork')
            .then(response => {
                if (response.status === 401) {
                    authService.signout();
                    window.location.reload();
                }
                console.log(response);
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

    const editSelectedArtworkHandler = event => {
        const { name, value } = event.target;
        setSelectedArtwork({ ...selectedArtwork, [name]: value });
    };

    const editSelectedArtwork = (e) => {
        e.preventDefault();
        setLoading(true);
        api.put('/api/artwork', selectedArtwork)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        setSelectedArtwork({});
        setOffCanvasArtworkDetailToggle(!offCanvasArtworkDetailToggle);
        setLoading(false);
    };

    return (
        <div className="content-wrapper">
            <InsertArtwork
                offCanvasToggle={offCanvasToggle}
                offCanvasHandler={offCanvasHandler} />
            <ArtworkDetail
                offCanvasArtworkDetailToggle={offCanvasArtworkDetailToggle}
                offCanvasArtworkDetailHandler={offCanvasArtworkDetailHandler}
                editSelectedArtworkHandler={editSelectedArtworkHandler}
                editSelectedArtwork={editSelectedArtwork}
                selectedArtwork={selectedArtwork}
            />
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row justify-content-between mb-3">
                        <div className="col-6">
                            <h1>Artwork</h1>
                            <small>In Kai's Inventory there are {artworkCount} piece(s).</small>
                        </div>
                        <div className="col-6 btn-container">
                            <button className="btn btn-primary" disabled={true}>
                                <BsCloudDownload /> Download as PDF(<small>in Development</small>)
                            </button>
                            <button className="btn btn-primary"
                                onMouseUp={offCanvasHandler}>
                                <BsPlusSquare /> Add New Artwork
                            </button>
                        </div>
                    </div>
                    {loading ? 
                        <div className="spinner-border text-dark table-spinner" role="status">
                            <span className="sr-only"></span>
                        </div>
                        :
                    <table className="table table-striped table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Artwork</th>
                                <th scope="col">Artist</th>
                                <th scope="col">Location</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artworks &&
                                artworks.map((el) => {
                                return (
                                        <tr key={el.id} onMouseUp={() => offCanvasArtworkDetailHandler(el)}>
                                        <th scope="row"><img src="https://picsum.photos/50/50" alt={el.artwork_name} /></th>
                                        <td>{el.artwork_name}</td>
                                        <td>{el.artist_name}</td>
                                        <td>{el.location}</td>
                                        <td>{el.price} €</td>
                                    </tr>
                                );
                            })
                            }
                        </tbody>
                    </table>
                   }
                </div>
            </div>
        </div>
    );
};

export default Artwork;