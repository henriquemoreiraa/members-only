import { RiUser3Fill, RiLogoutBoxLine, RiLoginBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Teste</Link>
        </div>
        <ul>
            <li>
                <Link to='/login'>
                    <RiLoginBoxLine /> Login
                </Link>
            </li>
            <li>
            <Link to='/register'>
                    <RiUser3Fill /> Register
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header