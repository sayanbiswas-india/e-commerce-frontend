import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar.jsx'

let Checkout = () => {

    let [totalPrice, setTotalPrice] = useState('')
    let [myItems, setMyItems] = useState([])

    let history = useHistory()

    let fetchData = () => {
        fetch('http://127.0.0.1:8000/api/get-checkout-order-item/' + sessionStorage.getItem('id'), {
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

    let buyItems = () => {
        fetch('http://127.0.0.1:8000/api/set-bought-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify(
                {
                    user: sessionStorage.getItem('id'),
                }
            )
        }
        ).then(
            (response) => {
                fetchData()
                fetchTotalPrice()
                return response.json()
            }
        ).then(
            (data) => console.log(data)
        )

    }

    let fetchTotalPrice = () => {
        fetch('http://127.0.0.1:8000/api/get-total-value/' + sessionStorage.getItem('id'), {
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
                    setTotalPrice(data)
                }
            })
    }


    useEffect(
        () => {
            fetchData()
            fetchTotalPrice()
        }, []
    )

    let Products = () => {
        return (
            <>
                {
                    myItems.map(
                        (value) => {
                            return (
                                <li class="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 class="my-0">{value.item.title}</h6>
                                        <small class="text-muted">Q : {value.quantity}</small>
                                    </div>
                                    <span class="text-muted"> EACH : {value.item.price}</span>
                                </li>
                            )
                        }
                    )
                }
            </>
        )

    }


    return (
        <>
            <NavBar />
            <div class="row container m-auto">
                <div class="col-md-4 order-md-2 mb-4 mt-4">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-muted">Your cart</span>
                        <span class="badge badge-secondary badge-pill">{totalPrice.cart_length}</span>
                    </h4>
                    <ul class="list-group mb-3">
                        <Products />
                        <li class="list-group-item d-flex justify-content-between">
                            <h5> Total : {'$ ' + totalPrice.total_price}</h5>
                        </li>
                    </ul>
                </div>
                <div class="col-md-8 order-md-1">
                    <h4 class="mb-3">Billing address</h4>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="firstName">First name</label>
                            <input type="text" class="form-control" id="firstName" placeholder="" required="" />
                            <div class="invalid-feedback">
                                Valid first name is required.
                                </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="lastName">Last name</label>
                            <input type="text" class="form-control" id="lastName" placeholder="" required="" />
                            <div class="invalid-feedback">
                                Valid last name is required.
                                </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="you@example.com" />
                        <div class="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                            </div>
                    </div>

                    <div class="mb-3">
                        <label for="address">Address</label>
                        <input type="text" class="form-control" id="address" placeholder="1234 Main St" required="" />
                        <div class="invalid-feedback">
                            Please enter your shipping address.
                            </div>
                    </div>

                    <div class="mb-3">
                        <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                        <input type="text" class="form-control" id="address2" placeholder="Apartment or suite" />
                    </div>

                    <div class="row">
                        <div class="col-md-5 mb-3">
                            <label for="country">Country</label>
                            <select class="custom-select d-block w-100" id="country" required="">
                                <option value="">Choose...</option>
                                <option>India</option>
                                <option>United States</option>
                            </select>
                            <div class="invalid-feedback">
                                Please select a valid country.
                                </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="state">State</label>
                            <select class="custom-select d-block w-100" id="state" required="" >
                                <option value="">Choose...</option>
                                <option>West Bengal</option>
                                <option>California</option>
                            </select>
                            <div class="invalid-feedback">
                                Please provide a valid state.
                                </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="zip">Zip</label>
                            <input type="text" class="form-control" id="zip" placeholder="" required="" />
                            <div class="invalid-feedback">
                                Zip code required.
                                </div>
                        </div>
                    </div>
                    <hr class="mb-4" />

                    <h4 class="mb-3">Payment</h4>

                    <div class="d-block my-3">
                        <div class="custom-control custom-radio">
                            <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked="" required="" />
                            <label class="custom-control-label" for="credit">Credit card</label>
                        </div>
                        <div class="custom-control custom-radio">
                            <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required="" />
                            <label class="custom-control-label" for="debit">Debit card</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="cc-name">Name on card</label>
                            <input type="text" class="form-control" id="cc-name" placeholder="" required="" />
                            <small class="text-muted">Full name as displayed on card</small>
                            <div class="invalid-feedback">
                                Name on card is required
                                </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="cc-number">Card number</label>
                            <input type="text" class="form-control" id="cc-number" placeholder="" required="" />
                            <div class="invalid-feedback">
                                Card number is required
                                </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 mb-3">
                            <label for="cc-expiration">Expiration</label>
                            <input type="text" class="form-control" id="cc-expiration" placeholder="" required="" />
                            <div class="invalid-feedback">
                                Expiration date required
                                </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="cc-expiration">CVV</label>
                            <input type="text" class="form-control" id="cc-cvv" placeholder="" required="" />
                            <div class="invalid-feedback">
                                Security code required
                                </div>
                        </div>
                    </div>
                    <hr class="mb-4" />
                    <button class="btn btn-primary btn-lg btn-block mb-4" onClick={
                        () => {
                            buyItems()
                            history.push('/profile')
                        }
                    } >Confirm Order</button>
                </div>
            </div>
        </>
    )
}

export default Checkout;
