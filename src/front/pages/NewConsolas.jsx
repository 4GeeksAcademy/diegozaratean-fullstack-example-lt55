import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const NewConsola = () => {

    const navigate = useNavigate()

    const [name,setName] = useState('')
    const [price,setPrice] = useState('')


    function sendData(e){
        e.preventDefault()
        console.log('send data')
        console.log(name, price)
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
                {
                    "precio": price,
                    "name": name
                }
            )
        }
        fetch(import.meta.env.VITE_BACKEND_URL + '/api/consolas',requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            navigate('/consolas')
        })
    }
    return (
        <div>
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                    <input value={price} onChange={(e)=>setPrice(e.target.value)} type="number" className="form-control" id="exampleInputPassword1"/>
                </div>                
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        </div>        
    );
}

export default NewConsola