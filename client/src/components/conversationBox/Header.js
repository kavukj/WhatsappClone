import React, { useContext } from 'react';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import { AccountContext } from '../context/AccountContext';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

const usestyles = makeStyles((theme) => ({
    header: {
        height: "6vh",
        width: "100%",
        background: "#EDEDED",
        display: "flex",
        padding: 10,
        [theme.breakpoints.down('md')]: {
            padding: 8,
            height: "6.5vh"
        }
    },
    img: {
        borderRadius: "50%",
        height: "100%"
    },
    name: {
        marginLeft: 14,
    },
    icons: {
        marginLeft: "auto",
        '& > *': {
            marginTop: 8,
            marginRight: 20,
            color: "#51585C",
            cursor: "pointer",
        }
    },
    status: {
        fontSize: 12,
        color: "rgba(0,0,0,0.5)"
    }
}))

const Header = () => {
    const classes = usestyles();
    const { person } = useContext(UserContext);
    const { activeUser } = useContext(AccountContext);

    return (
        <Box className={classes.header}>
            <Box>
                <img src={person.imageUrl} alt="dp" className={classes.img} />
            </Box>
            <Box className={classes.name}>
                <Typography>{person.name}</Typography>
                <Typography className={classes.status}>
                    {
                        activeUser?.find(user => user.userId === person.googleId) ? 'online' : 'offline'
                    }
                </Typography>
            </Box>
            <Box className={classes.icons}>
                <SearchIcon />
                <MoreVertIcon />
            </Box>
        </Box>

    )

}

export default Header;