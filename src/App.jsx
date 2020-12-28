import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import CreateProduct from './components/CreateProduct.jsx'
import Home from './components/Home.jsx'
import DeleteProduct from './components/DeleteProduct.jsx'
import Register from './components/Register.jsx'
import Bootstrap from './components/Bootstrap.jsx'
import Login from './components/Login.jsx'
import Logout from './components/Logout.jsx'
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx'
import Profile from './components/Profile.jsx'

const App = () => {

    let [loginPop, setLoginPop] = useState(false)

    return (
        <div className='main' >
            <Bootstrap />
            <Switch>
                <Route exact path='/' render={() => <Home loginPop={loginPop} setLoginPop={setLoginPop} />} />
                <Route path='/create' component={CreateProduct} />
                <Route path='/delete' component={DeleteProduct} />
                <Route path='/register' render = {
                    () => {
                        let auth = sessionStorage.getItem('token') === null
                        if (auth === true){
                            return <Register />
                        }else {
                            return <Redirect to = '/' />
                        }
                    }
                } />
                <Route path='/login' render={() => {
                    let auth = sessionStorage.getItem('token') === null
                    if (auth === true) {
                        return <Login setLoginPop={setLoginPop} />
                    } else {
                        return <Redirect to='/' />
                    }
                }} />
                <Route path='/logout' render={
                    () => {
                        let auth = sessionStorage.getItem('token') === null
                        if (auth === false) {
                            return <Logout />
                        } else {
                            return <Redirect to='/' />
                        }
                    }
                } />
                <Route path='/profile' component={Profile} />
                <Route path='/cart' render={() => {
                    let auth = sessionStorage.getItem('token') === null
                    if (auth === false) {
                        return <Cart />
                    } else {
                        return <Redirect to='/' />
                    }
                }
                } />
                <Route
                    path='/checkout'
                    render={() => <Checkout />} />
            </Switch>
        </div>

    )
}

export default App; 