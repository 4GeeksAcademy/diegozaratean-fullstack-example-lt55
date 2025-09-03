import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Consola = () => {

    const [consolas, setConsolas] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getConsolas(){
        fetch(backendUrl + '/api/consolas')
        .then(response => response.json())
        .then(data => setConsolas(data))
    }

    function deleteConsola(consola_id){

        const requestOptions = {
            method: 'DELETE'
        }
        fetch(backendUrl + '/api/consolas/'+consola_id,requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            getConsolas()
        })
    }

    useEffect(() => {
        getConsolas()
    }, [])

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Consolas!!</h1>
            <div className="ml-auto">
                <Link to="/add_console">
                    <button className="btn btn-success my-3">Crear consola</button>
                </Link>
            </div>
            { consolas.map( (consola)=> 
            
                <p key={consola.id}>
                    Nombre: {consola.name}    
                    Precio: {consola.precio}    
                    Rating: {consola.rating}    
                    <Link to={"/consolas/"+ consola.id}>
                        <button className="btn btn-primary">Ver consola</button>
                    </Link>
                    <Link to="/demo">
                        <button className="btn btn-info">Editar consola</button>
                    </Link>
                    <button className="btn btn-danger" onClick={()=>deleteConsola(consola.id)}>Eliminar consola</button>

                </p>
             )}
      
           
        </div>
    );
}; 