import { makeStyles, Toolbar, AppBar } from '@material-ui/core';
import { useContext } from 'react';
import Chatbox from './account/Chatbox';
import Login from './account/Login';
import { AccountContext } from './context/AccountContext';

const usestyles = makeStyles({
    root: {
        background: "#DCDCDC",
        height: "100vh"
    },
    header: {
        height: 200,
        background: "#00BFA5",
        boxShadow: "none"
    },
    loginHeader: {
        height: 115,
        background: "#00BFA5",
        boxShadow: "none"
    }
})

const Messenger = () => {
    const classes = usestyles();
    const { account } = useContext(AccountContext);
    return (
        <div className={classes.root}>
            <AppBar className={account ?classes.loginHeader: classes.header}>
                <Toolbar>
                </Toolbar>
            </AppBar>
            {account ? <Chatbox /> : <Login />}

        </div>
    )
}

export default Messenger;