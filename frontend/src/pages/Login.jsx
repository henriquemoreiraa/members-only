import { useContext } from 'react'
import { useState, useEffect } from 'react' 
import { RiLoginBoxLine } from 'react-icons/ri'
import api from '../api'
import { Context } from '../context/AuthContext'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { authenticated, handleLogin } = useContext(Context)

  console.log(authenticated)

  const { name, email, password, password2 } = formData

  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.taget.name]: e.target.value
    }))
  }

  const login = () => {
    api.post('/api/users/login', {
      email: 'henrique123@gmail.com',
      password: '1234556'
    })
  }

  const onSubmit= (e) => {
    e.preventDefault()

    handleLogin()
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <RiLoginBoxLine /> Login
        </h1>
        <p>Login and start create posts for members only</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type="email"
              className='form-control'
              id='email' 
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type="password"
              className='form-control'
              id='password' 
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
        <button onClick={login} className='btn btn-block'>testeeeeas1!</button>
      </section>
    </>
  )
}

export default Login