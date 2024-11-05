import { createContext, useState } from "react";

export const UserAuthContext = createContext(null);

export const UserAuthProvider = ({children}) => {
const userRegisterInfo = localStorage.getItem('userRegisterInfo');
const [user, setUser] = useState(userRegisterInfo);

const login = (user) => {
    setUser(user)
}
const register = (user) => {
    setUser(user)
}

const logout = () => {
    localStorage.removeItem('userRegisterInfo');
    setUser(null)
}
return (
    <UserAuthContext.Provider value={{ 
        user,
        register , 
        login,
        logout
        }}>
        {children}
    </UserAuthContext.Provider>
)
}