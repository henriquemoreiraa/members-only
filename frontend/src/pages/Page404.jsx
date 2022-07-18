import { Link } from "react-router-dom"
import { Context } from '../context/AuthContext'
import { useContext } from 'react'

function Page404() {
    const { authenticated } = useContext(Context)

  return (
    <>
        <h1>404 PAGE NOT FOUND</h1>
        {authenticated ? <span className="cancel"><Link to='/'>Initial page</Link></span> : 
            <>
                <span className="cancel"><Link to='/register'>register page</Link></span>
                <p>Or</p>
                <span className="cancel"><Link to='/login'> login page </Link></span>
            </>
        }

    </>
  )
}

export default Page404