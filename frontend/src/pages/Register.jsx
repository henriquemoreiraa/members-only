import { useNavigate } from 'react-router-dom' 
import { RiUser3Fill } from 'react-icons/ri'
import { useContext } from 'react'
import { Context } from '../context/AuthContext'

function Register() {
  const navigate = useNavigate()

  const { handleRegister, formData, setFormData } = useContext(Context)

  const { name, email, password, password2 } = formData

  const onSubmit= (e) => {
    e.preventDefault()

    if (password === password2) {
      handleRegister()
      navigate('/posts')
    } else {     
      window.alert("Passwords don't match.")
  } 
}

  return (
    <>
      <section className='heading'>
        <h1>
          <RiUser3Fill /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type="text"
              className='form-control'
              id='name' 
              name='name'
              value={name}
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
          <div className='form-group'>
            <input
              type="password"
              className='form-control'
              id='password2' 
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={(e) => setFormData(prevState => ({ ...prevState, password2: e.target.value }))}
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

export default Register