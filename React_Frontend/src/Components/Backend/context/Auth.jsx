import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const storedUserInfo = localStorage.getItem('userInfo');
    const [user, setUser] = useState(storedUserInfo ? JSON.parse(storedUserInfo) : null);

    const login = (userInfo) => {
        setUser(userInfo);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
             user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

