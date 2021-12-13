import { createContext, useState } from 'react';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [person, setPerson] = useState();
    const [newUser, setnewUser] = useState(false);
    return (
        <UserContext.Provider value={{
            person,
            setPerson,
            setnewUser,
            newUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
