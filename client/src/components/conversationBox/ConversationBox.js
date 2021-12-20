import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { UserContext } from '../context/UserContext';
import { AccountContext } from '../context/AccountContext';
import Header from './Header';
import Chat from './Chat';
import TextArea from './TextArea';
import { getConversationId } from '../service/api';
import { newMessage } from '../service/api';
import EmojiKeyboard from './EmojiKeyboard';

const ConversationBox = () => {
    const [conversation, setConversation] = useState();
    const [openEmoji, setOpenEmoji] = useState(false);
    const { person } = useContext(UserContext);
    const { setNewMessageFlag, account, socket } = useContext(AccountContext);
    const [textValue, setTextValue] = useState('');

    useEffect(() => {
        const getconversationDetail = async () => {
            let data = await getConversationId({ senderId: account.googleId, receiverId: person.googleId });
            setConversation(data)
        }
        getconversationDetail();
    }, [person.googleId, account.googleId])

    const receiverId = conversation?.members?.find(member => member !== account.googleId)

    const sendText = async (e) => {
        let code = e.keyCode || e.which
        if (code === 13) {
            let message = {
                senderId: account.googleId,
                conversationId: conversation._id,
                text: textValue
            }
            socket.current.emit('sendMessage', {
                senderId: account.googleId,
                receiverId: receiverId,
                textValue: textValue
            })
            await newMessage(message);
            setNewMessageFlag(prev => !prev)
            setTextValue('')
        }
    }

    return (

        <Box style={{ height: "100%", overflow: "hidden" }}>
            <Header />
            <Chat conversation={conversation} person={person} openEmoji={openEmoji} />
            {
                openEmoji ?
                    <EmojiKeyboard setTextValue={setTextValue} textValue={textValue} />
                    : null
            }
            <TextArea sendText={sendText} setTextValue={setTextValue} textValue={textValue}
                openEmoji={openEmoji} setOpenEmoji={setOpenEmoji} />
        </Box>

    )

}

export default ConversationBox;