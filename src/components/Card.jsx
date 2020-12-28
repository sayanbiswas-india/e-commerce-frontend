import React, { useState } from 'react'


const Card = (props) => {

    let auth = sessionStorage.getItem('token')

    const setOrderItem = () => {
        if (auth !== null) {
            fetch('http://127.0.0.1:8000/api/set-order-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
                }
                , body: JSON.stringify(
                    {
                        quantity: 1,
                        user: sessionStorage.getItem('id'),
                        item: props.id
                    }
                )
            }).then(
                (response) => {
                    return response.json()
                }
            ).then(
                (data) => {
                    props.setShowPopup(true)
                }
            )
        } else {
            props.setLoginPopUp(true)
        }
    }

    return (<div>
        <div className="card-deck container-fluid m-auto bg-light">
            <div className="card shadow-lg  bg-white rounded bg-light mt-4 mb-2 " >
                <img src={props.image} className="card-img-top" alt="..." />
                <div className="card-body border-top ">
                    <div className="d-flex justify-content-between">
                        <h5>{props.price}</h5>
                        <h5>{props.title}</h5>
                    </div>
                    <hr />
                    <a onClick={setOrderItem} className="btn btn-info ">Add to Cart</a>
                </div>
            </div>
        </div>

    </div>
    )

}

export default Card;
