import { makeStyles, Box } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../context/AccountContext';
import { UserContext } from '../context/UserContext';
import { getUser } from '../service/api';
import Chat from './Chat';

const usestyles = makeStyles({
    root: {
        height: 520
    },
    section: {
        height: "auto",
        background: "white",
        borderBottom: "1px solid rgba(0,0,0,0.05)"
    }
})

const Conversation = ({ searchValue }) => {
    const classes = usestyles();
    const [users, setUsers] = useState([]);
    const { account, socket, setActiveUser, activeUser } = useContext(AccountContext);
    const { newUser } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUser();
            const filterData = data.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()))
            setUsers(filterData)
        }
        fetchData();
    }, [searchValue,newUser,activeUser])

    useEffect(() => {
        socket.current.emit('addUsers', account.googleId)
        socket.current.on('getUsers', users => { setActiveUser(users) })
    }, [account])

    return (
        <Box className={classes.root}>
            {users.map(user => (
                user.googleId !== account.googleId &&
                <Box key={user.googleId} className={classes.section}>
                    <Chat user={user} />
                </Box>

            ))}

        </Box>
    )
}

export default Conversation;