import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DetalleProducto = ({ match }) => {
  const [producto, setProducto] = useState({});
  const url = "https://backend-mundomanga.onrender.com";

  const obtenerProducto = async () => {
    const producto_id = match.params.id; // Obtén el ID del producto desde la URL
    const endpoint = `/productos/${producto_id}`;
    try {
      const response = await axios.get(url + endpoint);
      setProducto(response.data);
    } catch (error) {
      console.log("Error al obtener el producto", error);
    }
  }

  useEffect(() => {
    obtenerProducto();
  }, [match]);

  return (
    <div>
      <h1 className='text-center'>Detalle del Producto {producto.id}</h1>
      <div className="product-details">
        <div className='centered-container'>
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <p>Precio: ${producto.precio}</p>
          
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
