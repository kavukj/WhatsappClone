import React, { useContext } from 'react';
import { withStyles, makeStyles, Dialog, Box } from '@material-ui/core';
import Menu from '../menu/Menu';
import ConversationBox from '../conversationBox/ConversationBox';
import { UserContext } from '../context/UserContext';
import EmptyChat from '../conversationBox/EmptyChat';

const style = {
    dialog: {
        width: "90%",
        height: "95%",
        borderRadius: 0,
        maxHeight: '100%',
        maxWidth: '100%',
        marginTop: '2%',
        overflowY: "hidden",
        overflowX: "auto",
    }
}

const usestyles = makeStyles((theme) => ({
    component: {
        display: "flex"
    },
    left: {
        minWidth: 200,
        width: 360
    },
    right: {
        borderLeft: "1px solid rgba(0,0,0,0.2)",
        minWidth: 380,
        width: 1025
    }

}))

const Chatbox = ({ classes }) => {

    const classname = usestyles();
    const { person } = useContext(UserContext);

    return (
        <Dialog open={true} classes={{ paper: classes.dialog }}
            BackdropProps={{ style: { backgroundColor: "unset" } }}>
            <Box className={classname.component}>
                <Box className={classname.left}>
                    <Menu />
                </Box>
                <Box className={classname.right}>
                    {person ? <ConversationBox /> : <EmptyChat />}
                </Box>
            </Box>
        </Dialog>
    )

}

export default withStyles(style)(Chatbox);