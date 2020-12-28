import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar.jsx'

let Register = () => {

    let [pass1, getPass1] = useState('')
    let [pass2, getPass2] = useState('')
    let [username, getUsername] = useState('')
    let [passAlert, showPassAlert] = useState(false)
    let [sameUser, isSameUser] = useState(false)
    let history = useHistory()

    let PassNotMatchAlert = () => {
        if (passAlert === true) {
            return (
                <div class="alert alert-danger mt-2" role="alert">
                    Passwords do not match. Please write your password again .
                </div>)
        } else {
            return null
        }
    }

    let SameUsernameAlert = () => {
        setTimeout(
            () => isSameUser(false), 4000
        )
        if (sameUser === true) {
            return (
                <div class="alert alert-danger mt-2" role="alert">
                    Username already exists. Please try a different username.
                </div>)
        } else {
            return null
        }
    }

    let handleSubmit = () => {
        pass1 === pass2 ? fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify(
                {
                    user: {
                        username: username,
                        password: pass2
                    }

                }
            )
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log(data)
                if (data.response === 'error') {
                    isSameUser(true)
                } else {
                    history.push('/login')
                }
            }

        ) : showPassAlert(true)

    }



    return (
        <>
            <NavBar />
            <div className='container '>
                <PassNotMatchAlert />
                <SameUsernameAlert />
                <div class="form-group mt-2">
                    <label for="exampleInputEmail1">Username</label>
                    <input placeholder='The username can only be of one word' type="email" class="form-control" onChange={e => getUsername(e.target.value)} />
                </div>
                <div class="form-group mt-2">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="text" class="form-control" onChange={e => getPass1(e.target.value)} />
                </div>
                <div class="form-group mt-2">
                    <label for="exampleInputPassword1">Confirm Password</label>
                    <input type="password" class="form-control" onChange={e => getPass2(e.target.value)} />
                </div>
                <button class="btn btn-primary mt-2" onClick={handleSubmit} >Submit</button>
                <br />
                <br />
                <span className='text-muted m-auto' href="/register">Already have an account? <a href="/login">Login</a></span>
            </div>
        </>
    )
}

export default Register;