import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import NavBar from './NavBar.jsx'

let Cart = () => {

    let [myItems, setMyItems] = useState([])
    let history = useHistory()


    let fetchData = () => {
        fetch('http://127.0.0.1:8000/api/get-order-item/' + sessionStorage.getItem('id'), {
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
                if (data) {
                    setMyItems(data)
                }
            })
    }



    useEffect(
        () => {
            fetchData()
        }, []
    )

    let adjustQty = (id, change = 0) => {
        let i = myItems.findIndex(e => e.id === id);
        setMyItems(
            prev => [
                ...prev.slice(0, i),
                { ...prev[i], quantity: prev[i].quantity + change },
                ...prev.slice(i + 1),
            ]
        )
    }

    let adjustProceed = (e) => {
        if (e.proceed === true) {
            e.proceed = false
        } else if (e.proceed === false) {
            e.proceed = true
        }
    }

    myItems.map(
        (e) => {
            if (e.quantity < 1) {
                e.quantity = 1
            }
            return null
        }
    )


    let handleChange = (item_id, quantity, proceed) => {
        fetch('http://127.0.0.1:8000/api/update-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
            }
            , body: JSON.stringify(
                {
                    item_id: item_id,
                    quantity: quantity,
                    user_id: sessionStorage.getItem('id'),
                    proceed: proceed
                }
            )
        }).then(
            (response) => {
                return response.json()
            }
        ).then(
            (data) => {
                console.log(data)
            }
        )
    }

    let deleteItem = (id) => {
        fetch('http://127.0.0.1:8000/api/delete-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
            }
            , body: JSON.stringify(
                {
                    id: id,
                    user_id: sessionStorage.getItem('id')
                }
            )
        }).then(
            (response) => {
                return response.json()
            }
        ).then(
            (data) => {
                console.log(data)
                fetchData()
            }
        )
    }

    let CartItems = () => {
        return myItems.map(
            (value) => {
                return (
                    <div className='row  w-100 m-auto' >
                        <div className="card-deck  w-100 container-fluid m-auto bg-light">
                            <div className="card shadow-lg p-1 mb-5 bg-white bg-light mt-4 mb-2 " >
                                <img src={value.item.image} className="card-img-top m-auto" alt="..." style={{ width: "20rem" }} />
                                <div className="card-body border-top ">
                                    <div className='d-flex justify-content-between' >
                                        <h4>{value.item.title}</h4>
                                        <div className='d-flex flex-row-reverse' >
                                            <svg onClick={() => {
                                                adjustQty(value.id, +1)
                                            }} id='add' xmlns="http://www.w3.org/2000/svg" width="28" height="23" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16" >
                                                <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                            </svg>
                                            <input readOnly value={value.quantity} className='w-25  h-75 text-center' />
                                            <svg onClick={() => {
                                                adjustQty(value.id, -1)
                                            }} xmlns="http://www.w3.org/2000/svg" width="32" height="25" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                            </svg>
                                            <svg className='mr-1' onClick={() => deleteItem(value.id)} xmlns="http://www.w3.org/2000/svg" width="22" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h5>{value.item.price}</h5>
                                    <div class="form-check d-flex  justify-content-between">
                                        <input onClick={() => adjustProceed(value)} type="checkbox" class="form-check-input" id="quantity" defaultChecked={value.proceed} />
                                        <label class="form-check-label" for="exampleCheck1">Proceed this item to checkout</label>
                                        <button onClick={() => {
                                            handleChange(value.item.id, value.quantity, value.proceed)
                                        }
                                        } class="btn btn-success ">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            }
        )

    }


    return (
        <div >
            <NavBar />
            <hr />
            <button onClick={
                () => history.push('/checkout')
            } type="button" class=" w-75 m-auto  btn btn-warning btn-lg btn-block">Proceed to Checkout</button>
            <CartItems />
        </div >
    )


}

export default Cart;

