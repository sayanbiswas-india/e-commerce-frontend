import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Navbar from './NavBar.jsx'

const Login = (props) => {

    let [pass1, getPass1] = useState('')
    let [username, getUsername] = useState('')
    let history = useHistory()
    let [loginFail, setLoginFail] = useState(false)

    const getUserInfo = () => {
        fetch('http://127.0.0.1:8000/api/get-user-id/' + sessionStorage.getItem('username'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
            }
        }).then(
            (response) => {
                return response.json()
            }
        ).then(
            (data) => {
                sessionStorage.setItem('id', data.id)
                console.log(data)
            })
    }

    let LoginFailed = () => {
        setTimeout(
            () => setLoginFail(false), 5000
        )
        if (loginFail === true) {
            return (
                <div class="alert alert-danger mt-2" role="alert">
                    Your username or password is incorrect
                </div>)
        } else {
            return null
        }
    }


    let handleSubmit = () => {
        fetch('http://127.0.0.1:8000/api/token-auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify(
                {
                    username: username,
                    password: pass1
                }
            )
        }).then(
            (response) => {
                return response.json()
            }
        ).then(
            (data) => {
                if (data.detail !== 'No active account found with the given credentials') {
                    sessionStorage.setItem('token', data.access)
                    sessionStorage.setItem('logged', true)
                    props.setLoginPop(true)
                    sessionStorage.setItem('username', username)
                    history.push('/')
                    getUserInfo()
                }
                else {
                    setLoginFail(true)
                }
            }
        )

    }



    return (
        <>
            <Navbar />
            <div className='container '>
                <LoginFailed />
                <div class="form-group mt-2">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="email" class="form-control" onChange={e => getUsername(e.target.value)} />
                </div>
                <div class="form-group mt-2">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" onChange={e => getPass1(e.target.value)} />
                </div>
                <button class="btn btn-primary mt-2" onClick={handleSubmit} >Login</button>
                <br />
                <br />
                <span className='text-muted m-auto' href="/register">Dont have an account? <a href="/register">Register</a></span>
                <p className='text-muted mt-3 ' >You will be logged off automatically when the session is over</p>
            </div>
        </>
    )
}

export default Login;