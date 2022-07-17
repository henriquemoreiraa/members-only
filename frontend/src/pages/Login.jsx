import { useContext } from 'react'
import { useState, useEffect } from 'react' 
import { RiLoginBoxLine } from 'react-icons/ri'
import { Context } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Login() {
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // })

  const navigate = useNavigate()
  const { handleLogin, formData, setFormData } = useContext(Context)

  const { email, password } = formData

  // const login = async () => {
  //   const { data } = await api.post('/api/users/login', {
  //     email: 'henrique123@gmail.com',
  //     password: '1234556'
  //   })
  //   console.log(data)
  // }

  const onSubmit = (e) => {
    e.preventDefault()

    handleLogin()

    navigate('/posts')  
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
              onChange={(e) => setFormData(prevState => ({ ...prevState, email: e.target.value }))}
              required
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
              onChange={(e) => setFormData(prevState => ({ ...prevState, password: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login