import { makeStyles, Box, Menu, MenuItem } from '@material-ui/core';
import { useContext, useState } from 'react';
import { AccountContext } from '../context/AccountContext';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Profile from '../drawer/Profile';
import { GoogleLogout } from 'react-google-login';

const usestyles = makeStyles((theme)=>({
    root: {
        background: "#EDEDED",
        height: "7vh",
        padding: "1vh 1vw",
    },
    profilePhoto: {
        height: 40,
        width: 40,
        borderRadius: 50,
        marginLeft:4
    },
    component: {
        display: "flex",

    },
    icons: {
        marginLeft: "auto",
        lineHeight: "7vh",
        '& > *': {
            marginLeft: 2,
            padding: 9,
            color: "#51585C",
            cursor:"pointer"
        }
    },
    menuItem: {
        color: "#4A4A4A",
        fontSize: 14,
        paddingLeft:"1.5vh 2vw 0.1vh 1vw",
    },
    logout:{
        '& > *':{
            margin:"0px!important",
            color:"#4A4A4A"
        },
        boxShadow:"none!important",
        height:"4vh",
        marginLeft:-12,

    }
}))

const Header = () => {
    const classes = usestyles();
    const { account, setAccount } = useContext(AccountContext);
    const [open, setOpen] = useState();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleClose = () => {
        setOpen(null)
    }
    const handleClick = (event) => {
        setOpen(event.currentTarget)
    }
    const handleLogoutSuccess = () => {
        console.clear()
        alert("You have logged out successfully")
        setAccount(null)
    }
    const toggleDrawer = () => {
        setDrawerOpen(true)
        handleClose()
    }

    return (
        <div className={classes.root}>
            <Box className={classes.component}>
                <img src={account.imageUrl} alt="DP" className={classes.profilePhoto} onClick={toggleDrawer} />
                <Box className={classes.icons}>
                    <ChatIcon />
                    <MoreVertIcon onClick={handleClick} />
                    <Menu
                        anchorEl={open}
                        keepMounted
                        open={Boolean(open)}
                        onClose={handleClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}

                    >
                        <MenuItem className={classes.menuItem} onClick={toggleDrawer}>Profile</MenuItem>
                        <MenuItem className={classes.menuItem} onClick={handleClose}>Starred Messages</MenuItem>
                        <MenuItem className={classes.menuItem} onClick={handleClose}>Settings</MenuItem>
                        <MenuItem className={classes.menuItem} onClick={handleClose}>
                            <GoogleLogout
                            className={classes.logout}
                                buttonText="Logout"
                                onLogoutSuccess={handleLogoutSuccess}
                                clientId={"688604241486-4vkb10eb1h3t5e9q2kfcemhjvkk3nl93.apps.googleusercontent.com","688604241486-hc6o1ob16gplotmgpt2eq9ik1e9orbqr.apps.googleusercontent.com"}
                            />
                        </MenuItem>
                    </Menu>
                </Box>
                <Profile drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
            </Box>
        </div>
    )
}

export default Header;