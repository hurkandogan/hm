import React, { useState, useEffect } from 'react';
import InsertInvoiceForm from './InsertInvoiceForm';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 'calc(60%)',
        maxHeight: 'calc(70%)',
        margin: '50px auto',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
}));

function InsertInvoiceModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.visible);
    }, [props.visible])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <InsertInvoiceForm />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default InsertInvoiceModal;