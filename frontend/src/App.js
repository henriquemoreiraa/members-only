import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Register from './pages/Register';
import Header from './components/Header';
import User from './pages/User'
import Page404 from './pages/Page404';

function App() {
  return (
    <>
      <AuthContext>
        <Router>
          <div className='container'>
            <Header />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/' element={<Posts />} />
              <Route path='/user' element={<User />} />
              <Route path='/*' element={<Page404 />} />

            </Routes>
          </div>
        </Router>
      </AuthContext>
    </>
  );
}

export default App;
