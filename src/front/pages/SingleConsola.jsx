import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import { useEffect, useState } from "react";


export const SingleConsola = props => {
    const [consola,setConsola] = useState({})
    const { consola_id } = useParams()
     const backendUrl = import.meta.env.VITE_BACKEND_URL

    function getConsola(){
        fetch(backendUrl + '/api/consolas/'+ consola_id)
        .then(response => response.json())
        .then(data => setConsola(data))
    }

    useEffect(()=>{
        getConsola()
    },[])


  return (
    <div className="container text-center">
      <h1 className="display-4">Consola: {consola_id}</h1>
      <hr className="my-4" />  {/* A horizontal rule for visual separation. */}
      <p> Nombre: {consola.name}</p>
      <p> Precio: {consola.precio}</p>

      <Link to="/consolas">
        <span className="btn btn-primary btn-lg" href="#" role="button">
          Back consola
        </span>
      </Link>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
SingleConsola.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
