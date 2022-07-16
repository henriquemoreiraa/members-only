import React, { createContext, useState } from 'react';
import api from '../api';

const Context = createContext();

function AuthContext({ children }) {
    const [authenticated, setAuthenticated] = useState(false)
    
    const handleLogin = async () => {
        const email = 'henrique123@gmail.com'
        const password = '1234556' 

        const { data } = await api.post('/api/users/login/', email, password)

        setAuthenticated(true)
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin}}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthContext }