import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import { AccountContext } from '../context/AccountContext';
import { getConversation } from '../service/api';
import Message from './Message';

const usestyles = makeStyles((theme) => ({
    component: {
        height: "79vh",
        overflowY: "auto",
        background: `url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})`
    },
    ShortComponent:{
        height: "53vh",
        overflowY: "auto",
        background: `url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})`
    },
    container: {
        padding: '2px 80px',
        [theme.breakpoints.down('sm')]: {
            padding: '2px 30px',
        },
    }

}))

const Chat = ({ conversation, person, openEmoji }) => {
    const classes = usestyles();
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const { newMessageFlag, socket } = useContext(AccountContext);
    const [incomingMessage, setIncomingMessage] = useState(null);

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                senderId: data.senderId,
                text: data.textValue,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
            setMessages((prev) => [...prev, incomingMessage])
    }, [incomingMessage, conversation])

    useEffect(() => {
        const getMessages = async () => {
            let data = await getConversation(conversation?._id)
            setMessages(data)
        }
        getMessages();
    }, [conversation?._id, newMessageFlag, person._id])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: 'smooth' })
    }, [messages])

    return (
        <Box className={openEmoji ? classes.ShortComponent : classes.component}>
            <Box className={classes.messageSection}>
                {
                    messages && messages.map(message => (
                        <Box key={message._id} className={classes.container} ref={scrollRef}>
                            <Message message={message} />
                        </Box>
                    ))
                }
            </Box>

        </Box>

    )

}

export default Chat;