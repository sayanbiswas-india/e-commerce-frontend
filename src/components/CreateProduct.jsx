import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateProduct = () => {

    let [title, setTitle] = useState('')
    let [image, setImage] = useState('')
    let [price, setPrice] = useState('')
    let createRedirect = useHistory()


    let postData = () => {
        fetch('http://127.0.0.1:8000/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')
            }
            , body: JSON.stringify(
                {
                    title: title,
                    image: image,
                    price: price
                }
            )
        }).then(
            response => response.json()
        ).then(
            (data) => {
                console.log(data)
                createRedirect.push('/')
            }
        )
    }
    return (
        <div className='container' >
            <div className="form-group mt-2">
                <label for="exampleInputEmail1">Product Name</label>
                <input type="text" className="form-control w-5" onChange={(e) => setTitle(e.target.value)} />
                <small id="emailHelp" className="form-text text-muted">The name of the product you want to create.</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Image link</label>
                <input type="text" className="form-control" onChange={(e) => setImage(e.target.value)} />
                <small id="emailHelp" className="form-text text-muted">Since,it is a side project I am not using cloud services. So, instead I an using image links</small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Price</label>
                <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} />
                <small id="emailHelp" className="form-text text-muted">Set the price of the product</small>
            </div>
            <button className="btn btn-primary" onClick={postData} >Submit</button>
        </div>
    )
}

export default CreateProduct;