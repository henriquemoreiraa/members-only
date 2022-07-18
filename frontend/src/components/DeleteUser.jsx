import { useContext } from 'react'
import api from '../api'
import { Context } from '../context/AuthContext' 
import { useNavigate } from 'react-router-dom'

function DeleteUser({ userId, setDeleteAcc }) {
    const { handleLogout } = useContext(Context)
    const navigate = useNavigate()

    const handleDelete = async () => {       
        const { data } = await api.delete(`/api/users/${userId}`)

        handleLogout()
        navigate('/login')
    }
  return (
    <div className=''>
        <div className='containerDE'>
            <h1>Are you sure you want to delete your account?</h1>
            <button onClick={() => setDeleteAcc(false)} className='buttonDE'>Cancel</button>
            <button onClick={handleDelete} className='buttonDE'>Delete</button>
        </div>
    </div>
  )

}

export default DeleteUser