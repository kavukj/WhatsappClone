import React, { useContext } from 'react';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { AccountContext } from '../context/AccountContext';

const usestyles = makeStyles((theme) => ({
    receiver: {
        background: "#FFFFFF",
        padding: 5,
        maxWidth: '60%',
        display: "flex",
        borderRadius: 10,
        width: "fit-content",
        wordBreak: "break-word"
    },
    sender: {
        background: "#DCF8C6",
        marginLeft:"auto",
        padding: 5,
        maxWidth: '60%',
        display: "flex",
        borderRadius: 10,
        width: "fit-content",
        wordBreak: "break-word"
    },
    text: {
        fontSize: 14,
        padding: "0 25px 0 5px"
    },
    time: {
        fontSize: 10,
        marginTop: 'auto',
        paddingRight:2,
        color: "#919191",
        wordBreak: "keep-all"
    }

}))

const Message = ({ message }) => {
    const classes = usestyles();
    const { account } = useContext(AccountContext);

    const formatDate = (date) => {
        return date < 10 ? '0' + date : date;
    }

    return (
        <Box className={account.googleId === message.senderId ? classes.sender : classes.receiver}>
            <Typography className={classes.text}>{message.text}</Typography>
            <Typography className={classes.time}>
                {formatDate(new Date(message.createdAt).getHours())}:{formatDate(new Date(message.createdAt).getMinutes())}
            </Typography>
        </Box>

    )

}

export default Message;