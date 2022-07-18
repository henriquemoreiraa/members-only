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

    // useEffect(() => {
    //     if (localStorage.getItem('member_status') === true) {
    //         setMemberStatus(true)
    //     } else {
    //         setMemberStatus(false)
    //     }
    // }, [])
    
    const { name, email, password, password2 } = formData
    
    const handleLogin = async () => {

        try {
            const { data } = await api.post('/api/users/login', {
                email, 
                password, 
            })   
            localStorage.setItem('memberStatus', data.member_status)
            // setMemberStatus(localStorage.getItem('memberStatus'))
            localStorage.setItem('name', (data.name))
            localStorage.setItem('userId', data._id)
    
            localStorage.setItem('token', JSON.stringify(data.token))
            api.defaults.headers.Authorization = `Bearer ${data.token}`
            setAuthenticated(true)
            console.log(data)
        } catch (error) {
            window.alert('Invalid credentials')
        }         
    }

    const handleLogout = () => {
        setAuthenticated(false)
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('memberStatus')
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

    }

    return (
        <Context.Provider value={{ handleRegister, handleLogin, formData, setFormData, authenticated, handleLogout, memberStatus }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthContext }