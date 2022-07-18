import { useState, useContext } from 'react'
import api from '../api'
import { RiSendPlaneFill } from 'react-icons/ri'
import { Context } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function EditUser({ email, name, userId, setUpdate }) {
    const [formData, setFormData] = useState({
        email: email,
        name: name,
    })

    const { handleLogout } = useContext(Context)
    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault()
    
        handlePut()        
    }

    const handlePut = async () => { 
        
        const { data } = await api.put(`/api/users/${userId}`, {
            email: formData.email,
            name: formData.name
        })

        handleLogout()
        navigate('/login')
    }

  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type="name"
              className='form-control'
              id='name' 
              name='name'
              value={formData.name}
              placeholder='Enter your name'
              onChange={(e) => setFormData(prevState => ({ ...prevState, name: e.target.value }))}
              required
            />
          </div>
          <div className='form-group'>
          <input
              type="email"
              className='form-control'
              id='email' 
              name='email'
              value={formData.email}
              placeholder='Enter your email'
              onChange={(e) => setFormData(prevState => ({ ...prevState, email: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block btn-update'>
              Update
            </button>
          </div>
        </form>
        <p className='cancel' onClick={() => setUpdate(false)}>Cancel</p>
      </section> 

  )
}

export default EditUser