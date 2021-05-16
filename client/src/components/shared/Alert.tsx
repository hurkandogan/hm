import React, { useState } from 'react';

const Alert = (props) => {

    const [showAlert, setShowAlert] = useState(false);

    const style = {
        zIndex: 5,
        right: 0,
        top: 0
    }
    return (
        <div>
            <div className="position-fixed bottom-0 right-0 p-3" style={style}>
                <div id="liveToast"
                    className={showAlert ? (
                        "toast fade show"
                    ) : (
                        "toast fade hide"
                    ) }
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    data-delay="2000">
                    <div className="toast-header">
                            <strong className="mr-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        <button type="button"
                            className="ml-2 mb-1 close"
                            data-dismiss="toast"
                            aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="toast-body">
                            Hello, world! This is a toast message.
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Alert;