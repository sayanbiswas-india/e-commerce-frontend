import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx'

let Profile = () => {

    let [orderedItems, setOrderedItems] = useState([])

    let fetchData = () => {
        fetch('http://127.0.0.1:8000/api/get-bought-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
            }
            , body: JSON.stringify(
                {
                    user: sessionStorage.getItem('id'),
                }
            )
        }).then(
            (response) => {
                return response.json()
            }
        ).then(
            (data) => {
                setOrderedItems(data)
            }
        )
    }

    useEffect(
        () => fetchData()
        , []
    )

    return (
        <>
        <NavBar />
        <div className ='container' >
            <h2 className = 'text-left mt-3' >My Orders</h2>
            <hr/>
            {
                orderedItems.map(
                    (value) => {
                        return (
                            <div className='row  w-100 m-auto' >
                                <div className="card-deck  w-100 container-fluid m-auto bg-light">
                                    <div className="card shadow-lg p-1 mb-5 bg-white bg-light mt-4 mb-2 " >
                                        <img src={value.item.image} className="card-img-top m-auto" alt="..." style={{ width: "20rem" }} />
                                        <div className="card-body border-top ">
                                            <div className='d-flex justify-content-between' >
                                                <h4>{value.item.title}</h4>
                                                <h4><span className='text-muted' >Q :</span> {value.quantity}</h4>
                                            </div>
                                            <h5>{value.item.price}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        )
                    }
                )
            }
        </div>
        </>
    )
}

export default Profile;