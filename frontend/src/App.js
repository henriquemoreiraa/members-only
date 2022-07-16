import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Register from './pages/Register';
import Header from './components/Header';

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
              <Route path='/posts' element={<Posts />} />
            </Routes>
          </div>
        </Router>
      </AuthContext>
    </>
  );
}

export default App;
