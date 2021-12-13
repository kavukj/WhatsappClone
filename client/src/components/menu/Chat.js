import { makeStyles, Box, Typography } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../context/AccountContext';
import { UserContext } from '../context/UserContext';
import { getConversationId, setConversation } from '../service/api';

const usestyles = makeStyles({
    root: {
        display: "flex",
        cursor: "pointer",
        padding: 10
    },
    img: {
        borderRadius: "50%",
        height: 40
    },
    heading: {
        display: "flex",
        height: 15
    },
    name: {
        fontSize: 15,
        lineHeight: 1.5,
        fontWeight: 600
    },
    time: {
        fontSize: 11,
        marginLeft: "auto",
        lineHeight: 2,
        fontWeight: 100,
        color: "#51585C"
    },
    chat: {
        marginTop: 9,
        fontSize: 13,
        fontWeight: 300,
        width: "100%",
        overflow: "hidden",
        height: 20,
        lineHeight: 2
    }
})

const Chat = ({ user }) => {
    const classes = usestyles();

    const { account, newMessageFlag } = useContext(AccountContext);
    const { setPerson } = useContext(UserContext)
    const [message, setMessage] = useState({});

    const setUser = async () => {
        await setConversation({ senderId: account.googleId, receiverId: user.googleId })
        setPerson(user)
    }

    useEffect(() => {
        const getConversationMessage = async () => {
            let data = await getConversationId({ senderId: account.googleId, receiverId: user.googleId })
            setMessage({ text: data.message, timestamp: data.updatedAt })
        }
        getConversationMessage();
    }, [newMessageFlag,account.googleId,user.googleId])

    const formatDate = (date) => {
        return date < 10 ? '0' + date : date;
    }

    return (
        <Box className={classes.root} onClick={() => setUser()}>
            <Box>
                <img src={user.imageUrl} alt="DP" className={classes.img} />
            </Box>
            <Box style={{ display: "block", width: "84%", paddingLeft: 10 }}>

                <Box className={classes.heading}>
                    <Box style={{ width: "84%", }}>
                        <Typography className={classes.name}>{user.name}</Typography>
                    </Box>
                    {message.text &&
                        <Box>
                            <Typography className={classes.time}>
                                {formatDate(new Date(message.timestamp).getHours())}:{formatDate(new Date(message.timestamp).getMinutes())}
                            </Typography>
                        </Box>
                    }
                </Box>
                {message.text &&
                    <Box className={classes.conversation}>
                        <Typography className={classes.chat}>
                            {message.text}
                        </Typography>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default Chat;