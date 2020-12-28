import React from 'react';
import { useHistory, Link } from 'react-router-dom';

let Logout = () => {

    let logoutRedirect = useHistory()

    let handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('logged')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('id')
        logoutRedirect.push('/')
    }

    return (
        <div className='container' >
            <div className='mt-5'>
                <h1 className='text-center mt-2' >Do you wish to logout?</h1>
            </div>
            <div className="text-center mt-5 ">
                <button type="button" class="btn btn-warning mr-4"><Link to='/' style={{ color: '#FFF' }} >Go to Homepage</Link></button>
                <button type="button" class="btn btn-success" onClick={handleLogout} >Logout</button>
            </div>
        </div>
    )
}

export default Logout;