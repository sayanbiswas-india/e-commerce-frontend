import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
const DeleteProduct = () => {

    let [title, setTitle] = useState('')
    let history = useHistory()

    let deleteData = () => {
        fetch('http://127.0.0.1:8000/api/delete/' + title, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            history.push('/')
        )
    }


    return (
        <div>
            <div class="form-group container mt-4">
                <label for="exampleInputEmail1">Delete Product</label>
                <input placeholder="Name of the product"  class="form-control" onChange={e => setTitle(e.target.value)} />
                <small id="emailHelp" class="form-text text-muted">Please provide the name of the item you want to delete.</small>
                <button  onClick={deleteData} class="btn btn-primary mt-3">Submit</button>
            </div>
        </div>
    )

}

export default DeleteProduct;