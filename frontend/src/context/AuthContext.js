import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

const Context = createContext();


function AuthContext({ children }) {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }

        setLoading(false)
    }, [])
    
    const { name, email, password, password2 } = formData
    
    const handleLogin = async () => {

        const { data } = await api.post('/api/users/login', {
            email, 
            password, 
          })

        localStorage.setItem('token', JSON.stringify(data.token))
        api.defaults.headers.Authorization = `Bearer ${data.token}`
        
        setAuthenticated(true)
        
        console.log(data)
          
    }

    const handleLogout = () => {
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
    }

    const handleRegister = async () => {
       
        const { data } = await api.post('api/users/register', {
            name,
            email,
            password,
        })

        localStorage.setItem('token', JSON.stringify(data.token))
        api.defaults.headers.Authorization = `Bearer ${data.token}`
        
        setAuthenticated(true)
        console.log(data)
    }

    return (
        <Context.Provider value={{ handleRegister, handleLogin, formData, setFormData, authenticated, handleLogout }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthContext }