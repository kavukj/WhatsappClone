import { Card, makeStyles } from '@material-ui/core';
import React from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

const usestyles = makeStyles((theme) => ({
    component: {
        height: "26vh",
        width: "100%",
    },
    keyboard: {
        width: "100vw"
    }
}))

const EmojiKeyboard = ({ setTextValue, textValue }) => {
    const classes = usestyles()

    const onEmojiClick = (e, emojiObject) => {
        setTextValue(textValue+emojiObject.emoji)
    }

    return (
        <Card className={classes.component}>
            <Picker className={classes.keyboard} onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK} />   
        </Card>
    )
}

export default EmojiKeyboard;
