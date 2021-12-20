import { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [activeUser, setActiveUser] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);

    const socket = useRef();

    useEffect(()=>{
        socket.current =  io('ws://localhost:6000');
    },[])

    return (
        <AccountContext.Provider value={{
            account,
            setAccount,
            socket,
            activeUser,
            setActiveUser,
            setNewMessageFlag,
            newMessageFlag
        }}>
            {children}
        </AccountContext.Provider>
    )

}

export default AccountProvider;