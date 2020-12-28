import React from 'react'
import { Link, useHistory } from 'react-router-dom'


const NavBar = () => {

    let history = useHistory()
    let logged = sessionStorage.getItem('logged')

    let UserShow = () => {
        return (<>
            <li className='mt-1'><a className='text-primary my-2 my-sm-0 mr-3my-2 my-sm-0 mr-3' > <Link to='/profile' >{sessionStorage.getItem('username')}</Link></a></li>
            <li className='mt-1'><Link to='/logout' className='my-2 my-sm-0 mr-3my-2 my-sm-0 mr-3' >Logout</Link></li>
        </>
        )
    }

    let Authentication = () => {
        return (
            <>
                <li className='mt-1'><Link to='/login' className='my-2 my-sm-0 mr-3my-2 my-sm-0 mr-3' >Login</Link></li>
                <li className='mt-1' ><Link to='/register' className='my-2 my-sm-0 mr-3my-2 my-sm-0 mr-3' >Register</Link></li>
            </>
        )
    }

    let handleCart = () => {
        history.push('/cart')
    }

    return (
        <nav class="navbar  navbar-expand-sm navbar-light " style={{ backgroundColor: '#e3f2fd' }}>
            <a class="navbar-brand" href="/">E-Commerce</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="nav navbar-nav" >
                    {
                        logged === 'true' ? <UserShow /> : <Authentication />
                    }
                    <li >
                        <svg onClick={handleCart} width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-cart2 " fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                        </svg>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default NavBar;
