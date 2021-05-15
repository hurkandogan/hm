import React, { useState } from 'react';
import InsertArtwork from '../offcanvas/InsertArtwork';
import {
    BsPlusSquare
    } from 'react-icons/bs';

const Artwork = () => {

    const [offCanvasToggle, setOffCanvasToggle] = useState(false);
    
    const offCanvasHandler = async () => setOffCanvasToggle(!offCanvasToggle);

    return (
        <div className="content-wrapper">
            <InsertArtwork
                offCanvasToggle={offCanvasToggle}
                offCanvasHandler={offCanvasHandler} />
            <div className="content-header">
                <div className="container-fluid">
                    <h1>Artwork</h1>
                    <button className="btn btn-primary" onMouseUp={offCanvasHandler}><BsPlusSquare /></button>
                    <table className="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    );
};

export default Artwork;