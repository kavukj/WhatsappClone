import { Box, Drawer, makeStyles, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../context/AccountContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { addAbout, getUserDetails, updateAbout, updateName } from '../service/api';

const style = (theme) => ({
    drawer: {
        top: "1.2vh",
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
        height: "4vh",
        overflowY: "hidden",
        width: "80%",
        display: "inline",
        marginLeft: 20,
        fontWeight: 100
    },
    edit: {
        marginTop: "0.5vh",
        fontSize: 15,
        paddingRight: "1vw",
        float: "right",
        color: "#51585C",
        cursor: "pointer"
    },
    textArea: {
        border: "none",
        outline: "none",
        width: "80%",
        fontSize: 13,
        borderBottom: "1px solid #00BFA5",
        paddingBottom: "5px",
        color: "#51585C",
    }
}))

const Profile = ({ drawerOpen, setDrawerOpen, classes }) => {
    const classname = usestyles();
    const { account } = useContext(AccountContext);
    const [userDetails, setUserDetails] = useState();
    const [aboutValue, setAboutValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [hiddenAbout, setHiddenAbout] = useState(true);
    const [hiddenName, setHiddenName] = useState(true);

    const handleClose = () => {
        setDrawerOpen(false)
    }

    const editAbout = () => {
        setHiddenAbout(!hiddenAbout)
        setAboutValue(userDetails?.about)
    }
    const editName = () => {
        setNameValue(userDetails?.name)
        setHiddenName(!hiddenName)
    }

    useEffect(() => {
        const getAboutValue = async () => {
            const details = await getUserDetails({ id: account.googleId })
            setUserDetails(details)
        }
        getAboutValue();
    }, [hiddenAbout,hiddenName])

    const handleAbout = (e) => {
        setAboutValue(e.target.value)
    }
    const handleName = (e) => {
        setNameValue(e.target.value)
    }

    const saveAbout = async (e) => {
        setHiddenAbout(!hiddenAbout)
        await updateAbout({ id: userDetails._id, textValue: aboutValue })
    }

    const saveName = async (e) => {
        setHiddenName(!hiddenName)
        await updateName({ id: userDetails._id, textValue: nameValue })
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
                <Typography style={{ width: "100%" }}>
                <div className={classname.value}>
                        {hiddenName ? userDetails?.name : <input type="text" className={classname.textArea} value={nameValue} onChange={handleName} />}
                    </div>
                    <Typography style={{ display: "inline" }}>
                    {hiddenName ?
                            <EditIcon className={classname.edit} onClick={editName} />
                            :
                            <DoneIcon className={classname.edit} onClick={saveName} />
                        }
                    </Typography>
                </Typography>
            </Box>
            <Box className={classname.note}>
                <Typography style={{ fontSize: 12 }}>This is not your username of pin. This will be visible to your WhatsApp contacts.</Typography>
            </Box>
            <Box className={classname.name}>
                <Typography className={classname.title}>About</Typography>
                <Typography style={{ width: "100%" }}>
                    <div className={classname.value}>
                        {hiddenAbout ? userDetails?.about : <input type="text" className={classname.textArea} value={aboutValue} onChange={handleAbout} />}
                    </div>
                    <Typography style={{ display: "inline" }}>
                        {hiddenAbout ?
                            <EditIcon className={classname.edit} onClick={editAbout} />
                            :
                            <DoneIcon className={classname.edit} onClick={saveAbout} />
                        }
                    </Typography>
                </Typography>
            </Box>
        </Drawer >
    )
}

export default withStyles(style)(Profile);