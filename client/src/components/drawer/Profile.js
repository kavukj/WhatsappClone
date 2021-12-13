import { Box, Drawer, makeStyles, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { useContext } from 'react';
import { AccountContext } from '../context/AccountContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';

const style = (theme) => ({
    drawer: {
        top: "1vw",
        left: "5vw",
        height: "95vh",
        minWidth: 360,
        width: 360,
        boxShadow: "none",
        borderRight: "1px solid #DCDCDC",
        borderBottom: "1px solid #DCDCDC",
        background: "#EDEDED"
    }
})
const usestyles = makeStyles((theme) => ({
    header: {
        background: "#00BFA5",
        fontSize: 20,
        fontWeight: 600,
        height: "14.5vh",
        color: "#FFF",
        display: "flex",
        '& > * ': {
            marginTop: "auto",
            padding: 16
        }
    },
    photoSection: {
        height: "25vh",
        background: "#EDEDED",
        padding: 20,
        display: "flex",
        justifyContent: "center"
    },
    photo: {
        borderRadius: "50%",
        height: "25vh"
    },
    name: {
        height: "12vh",
        background: "#FFF",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    },
    note: {
        height: "6vh",
        color: "rgba(0, 0,0,0.45)",
        padding: 16
    },
    title: {
        fontSize: 15,
        color: "#00BFA5",
        margin: 12,
        marginLeft: 20,
        fontWeight: 400
    },
    value: {
        color: "#51585C",
        margin: 12,
        fontSize: 15,
        marginLeft: 20,
        fontWeight: 100
    },
    edit:{
        fontSize:15,
        float:"right",
        color:"#51585C"
    }
}))

const Profile = ({ drawerOpen, setDrawerOpen, classes }) => {
    const classname = usestyles();
    const { account } = useContext(AccountContext);

    const handleClose = () => {
        setDrawerOpen(false)
    }
    return (
        <Drawer open={drawerOpen} onClose={handleClose} classes={{ paper: classes.drawer }}
            BackdropProps={{ style: { background: "unset" } }}>
            <Box className={classname.header}>
                <ArrowBackIcon onClick={handleClose} />
                <Typography>Profile</Typography>
            </Box>
            <Box className={classname.photoSection}>
                <img src={account.imageUrl} alt="Profile" className={classname.photo} />
            </Box>
            <Box className={classname.name}>
                <Typography className={classname.title}>Your Name</Typography>
                <Typography className={classname.value}>{account.name}<EditIcon className={classname.edit}/></Typography>
            </Box>
            <Box className={classname.note}>
                <Typography style={{ fontSize: 12 }}>This is not your username of pin. This will be visible to your WhatsApp contacts.</Typography>
            </Box>
            <Box className={classname.name}>
                <Typography className={classname.title}>About</Typography>
                <Typography className={classname.value}>Eat ! Sleep ! Repeat !<EditIcon className={classname.edit}/></Typography>
            </Box>
        </Drawer>
    )
}

export default withStyles(style)(Profile);