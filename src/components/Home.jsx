import Card from './Card.jsx'
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx'

const Home = (props) => {

    let [showPopup, setShowPopup] = useState(false)
    let [loginPopUp, setLoginPopUp] = useState(false)

    let LoginSuccessPopup = () => {
        setTimeout(
            () => props.setLoginPop(false), 3000
        )
        if (props.loginPop === true) {
            return (
                <div class="alert alert-success" role="alert">
                    You were successfully logged in.
                </div>
            )
        } else {
            return null
        }
    }

    let AddCartPopup = () => {
        setTimeout(
            () => setShowPopup(false), 4000
        )

        if (showPopup === true) {
            return (
                <div class="alert alert-success mt-2" role="alert">
                    Item successfully added to cart
                </div>
            )
        } else {
            return null
        }
    }

    let NotLoginPopUp = () => {

        setTimeout(
            () => setLoginPopUp(false), 4000
        )
        if (loginPopUp === true) {
            return (
                <div class="alert alert-warning mt-2" role="alert">
                    Please login to add items to cart.  <a href="/login">Login here</a>
                </div>
            )
        } else {
            return null
        }
    }

    let HomeBody = () => {
        return (<>
            <NavBar />
            <LoginSuccessPopup />
            <AddCartPopup />
            <NotLoginPopUp />
            <div className='row row-cols-1 row-cols-md-4' >
                {
                    data.map(
                        (value) => {
                            return <Card setLoginPopUp={setLoginPopUp} setShowPopup={setShowPopup} image={value.image} price={value.price} title={value.title} id={value.id} />
                        }
                    )
                }
            </div>
        </>
        )
    }

    useEffect(
        () => {
            fetch('http://127.0.0.1:8000/api/data').then(
                (response) => {
                    return response.json()
                }

            ).then(
                (info) => setData(info)
            )
        }, []
    )

    let [data, setData] = useState([])

    return (<>
        <HomeBody />
    </>
    )

}

export default Home;
