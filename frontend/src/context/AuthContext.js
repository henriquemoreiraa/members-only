import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

const Context = createContext();


function AuthContext({ children }) {
    const [memberStatus, setMemberStatus] = useState()
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
    }, [])
    
    const { name, email, password, password2 } = formData
    
    const handleLogin = async () => {

        try {
            const { data } = await api.post('/users/login', {
                email, 
                password, 
            })   
            localStorage.setItem('memberStatus', data.member_status)
            localStorage.setItem('name', (data.name))
            localStorage.setItem('userId', data._id)
            localStorage.setItem('email', data.email)
    
            localStorage.setItem('token', JSON.stringify(data.token))
            api.defaults.headers.Authorization = `Bearer ${data.token}`

            setAuthenticated(true)
        } catch (error) {
            window.alert('Invalid credentials')
        }         
    }

    const handleLogout = () => {
        setAuthenticated(false)
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('memberStatus')
        localStorage.removeItem('email')
        
        api.defaults.headers.Authorization = undefined
    }

    const handleRegister = async () => {
       
        const { data } = await api.post('/users/register', {
            name,
            email,
            password,
        })

        localStorage.setItem('token', JSON.stringify(data.token))
        api.defaults.headers.Authorization = `Bearer ${data.token}`

    }

    return (
        <Context.Provider value={{ handleRegister, handleLogin, formData, setFormData, authenticated, handleLogout, memberStatus }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthContext }