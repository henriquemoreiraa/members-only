import { useState, useEffect, useContext } from 'react' 
import { RiLoginBoxLine } from 'react-icons/ri'
import { Context } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { RiUser3Fill } from 'react-icons/ri'
import { GoVerified, GoUnverified } from 'react-icons/go'
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri'
import EditUser from '../components/EditUser';
import DeleteUser from '../components/DeleteUser';
import api from '../api';

function User() {
    const [update, setUpdate] = useState(false)
    const [deleteAcc, setDeleteAcc] = useState(false)

    const { handleLogout } = useContext(Context)

    const userInfo = {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        userId: localStorage.getItem('userId'),
        memberStatus: localStorage.getItem('memberStatus')
    }
    const { name, email, userId, memberStatus } = userInfo
    
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
        navigate('/login')
        } 
    }, [])

  const handleMember = async () => { 
        
    const { data } = await api.put(`/api/users/${userId}`, {
        member_status: 'member'
    })

    handleLogout()
    navigate('/login')
}

  return (
    <>
      <section className='heading'>
        <h1>
          <RiUser3Fill /> User account
        </h1>
        <p>Read, update or delete your account</p>
      </section>
       <section className='containerDE containerU'>
       {update ? <EditUser email={email} name={name} userId={userId} setUpdate={setUpdate}/> : deleteAcc ? <DeleteUser userId={userId} setDeleteAcc={setDeleteAcc} /> :
        <div className='userInfo'>
            <div>
                <h3>name: </h3>
                <p>{name}</p>
                <h3>email: </h3>
                <p>{email}</p>
                <h3>member status: {memberStatus ? <GoVerified fill='#02735E'/> : 'NOT MEMBER'}</h3>
            </div>
            <div className='user-buttons'>
                <button title='Delete account' onClick={() => setDeleteAcc(true)} ><RiDeleteBinLine /></button>
                <button title='Update account' onClick={() => setUpdate(true)}><RiEditLine /></button>
                
            </div>
        </div>}
      </section>
      {!update && !memberStatus && !deleteAcc ? <button className='buttonDE' onClick={handleMember}>Become a member</button> : ''}
    </>
  )
}

export default User