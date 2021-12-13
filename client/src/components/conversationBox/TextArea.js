import React from 'react';
import { makeStyles, Box, InputBase } from '@material-ui/core';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicIcon from '@material-ui/icons/Mic';

const usestyles = makeStyles((theme) => ({
    component: {
        height: "6.5vh",
        background: "#EDEDED",
        display: "flex",
        width: "100%",
        padding: "3px 14px",
        alignItems: "center",
    },
    icons: {
        '& > *': {
            color: "#51585C",
            cursor: "pointer",
            fontSize: 25,
            margin: 7
        }
    },
    rotate: {
        transform: 'rotate(40deg)'
    },
    textArea: {
        background: "#FFFFFF",
        borderRadius: 18,
        width: "80%",
        height: 30
    },
    inputRoot: {
        width: "100%",
    },
    inputInput: {
        paddingLeft: 25,
        fontSize: 14,
        width: "100%",
        height: 20,
        padding: theme.spacing(1, 1, 1, 0)
    }
}))

const TextArea = ({ sendText, setTextValue, textValue }) => {
    const classes = usestyles();

    return (
        <Box className={classes.component}>
            <Box className={classes.icons} style={{ minWidth: 80 }}>
                <EmojiEmotionsOutlinedIcon />
                <AttachFileIcon className={classes.rotate} />
            </Box>
            <Box className={classes.textArea}>
                <InputBase type="text" placeholder="Type a message"
                    inputProps={{ 'aria-label': 'search' }}
                    classes={{ root: classes.inputRoot, input: classes.inputInput }}
                    onKeyPress={(e) => sendText(e)}
                    onChange={(e) => setTextValue(e.target.value)}
                    value={textValue}
                />
            </Box>
            <Box className={classes.icons} style={{ marginRight: 30, marginLeft: "auto" }}>
                <MicIcon />
            </Box>
        </Box>

    )

}

export default TextArea;