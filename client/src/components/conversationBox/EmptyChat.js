import React from 'react';
import { makeStyles, Box } from '@material-ui/core';

const usestyles = makeStyles((theme) => ({
    component:{
        background:"#F8F9FA",
        height:"100%",
        textAlign:"center",
        paddingTop:40
    },
    image:{
        width:420
    }
}))

const EmptyChat = () => {

    const classname = usestyles();  
    const url="https://ik.imagekit.io/ag/wp-content/uploads/2015/01/QR-connected.png"
    return (

        <Box className={classname.component}>
            <img src={url} alt="empty-chat" className={classname.image}/>
        </Box>

    )

}

export default EmptyChat;