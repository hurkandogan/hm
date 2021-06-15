import React from 'react';


const Dashboard = () => {

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>
                    </div>
                </div>
      
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>75</h3>
                                        <p>Artwork Pieces</p>
                                    </div>
                                    {/* <div className="icon">
                                        <i className="ion ion-bag"></i>
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a> */}
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">

                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>3600€</h3>
                                        <p>Verwaltungskosten</p>
                                    </div>
                                   </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>21.000€</h3>
                                        <p>Versicherungskosten</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>65.000€</h3>
                                        <p>Renovierungskosten</p>
                                    </div>
                                  </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;