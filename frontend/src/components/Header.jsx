import { RiUser3Fill, RiLogoutBoxLine, RiLoginBoxLine } from 'react-icons/ri';
import { GoVerified, GoUnverified } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Header() {
    const { authenticated, handleLogout } = useContext(Context)
    const userName = localStorage.getItem('name')
    const memberStatus = localStorage.getItem('memberStatus')
    const navigate = useNavigate()

    const logout = () => {
        handleLogout()
        navigate('/login')
    }

  return (
    <header className='header'>
        <div className="logo">
            {authenticated ? <Link to='/'>Welcome back {userName} - Member status: {memberStatus ? <GoVerified /> : <GoUnverified />}</Link> : ''}
        </div>
        <ul>
            <li>
                {!authenticated ? <Link to='/login'>
                    <RiLoginBoxLine /> Login
                </Link> : <a className='logout' onClick={logout}><RiLogoutBoxLine /> Logout</a>}
            </li>
            <li>
                {authenticated ? '' : <Link to='/register'>
                    <RiUser3Fill /> Register
                </Link>}
            </li>
        </ul>
    </header>
  )
}

export default Header