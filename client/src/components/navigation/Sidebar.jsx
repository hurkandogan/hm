import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import InsertInvoiceModal from '../forms/InsertInvoiceModal';
import findAllObjects from '../../services/object.service.js';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import ApartmentRoundedIcon from '@material-ui/icons/ApartmentRounded';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    link: {
        textDecoration: 'none',
        color: 'revert',
        fontSize: 14,
    }
}));

function Sidebar() {

    const classes = useStyles();
    const theme = useTheme();
    const [objectsList, setObject] = useState([]);
    const [insertInvoicePopupToggle, setInsertInvoicePopupToggle] = useState(false);

    useEffect(() => {
        objectData();
    }, []);

    const objectData = () => {
        findAllObjects()
            .then(response => {
                const objects = response.data
                setObject(objects);
            })
            .catch(err => console.log("Sidebar#Sidebar#retrieveObjects: " + err));
    }

    const loadObjects = (data) => {
        return (
            <NavLink key={data.id} to={'/#/invoices/' + data.id} className={classes.link}>
                <ListItem button>
                    <ListItemIcon><ApartmentRoundedIcon /></ListItemIcon>
                    <ListItemText primary={data.name} />
                </ListItem>
            </NavLink>
        );
    }

    const insertInvoicePopupHandler = () => {
        insertInvoicePopupToggle ? setInsertInvoicePopupToggle(false) : setInsertInvoicePopupToggle(true);
    }

    const drawer = (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <List>
                <ListItem>
                    <ListItemText primary={'hugOS'} /><small>Version: 0.0.0</small>
                </ListItem>
                <Divider />
                <NavLink to={'/#/'} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                        <ListItemText primary={'Home'} style={{ fontSize: '14px' }} />
                    </ListItem>
                </NavLink>
                <button onClick={insertInvoicePopupHandler}>
                    <ListItem button>
                        <ListItemIcon><AddBoxRoundedIcon /></ListItemIcon>
                        <ListItemText primary={'Insert Invoice'} />
                    </ListItem>
                </button>
                <Divider />
                {objectsList.map((data) => loadObjects(data))}
                <Divider />
            </List>
        </div >
    );

    return (
        <div className={classes.root}>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                        <InsertInvoiceModal visible={insertInvoicePopupToggle} />
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}
export default Sidebar;