import { Card, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

const usestyles = makeStyles((theme) => ({
    component: {
        height: "20vh",
        width: "90vw",
        background: "red"
    },
    keyboard: {
        width: "100vw"
    }
}))

const EmojiKeyboard = ({ setTextValue, textValue }) => {
    const classes = usestyles()
    const [chooseEmoji, setChooseEmoji] = useState(null);
    const [emoji, setEmoji] = useState(null);

    const onEmojiClick = (e, emojiObject) => {
        setChooseEmoji(emojiObject)
    }

  

    return (
        <Card className={classes.component}>
            <Picker className={classes.keyboard} onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK} />
            {chooseEmoji && setTextValue(chooseEmoji.emoji)
            }
        </Card>
    )
}

export default EmojiKeyboard;
