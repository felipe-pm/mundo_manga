import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';

const Productos = () => {

  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const url = "http://localhost:3000";

  const obtenerProductos = async () => {
    const endpoint = "/productos";
    try {
        const response = await axios.get(url + endpoint);
        setProductos(response.data);
    } catch (error) {
        console.log("Error al obtener los productos",error);
    }
  }

  useEffect(() => {
    obtenerProductos();
  }, []);


  return (
    <div>
      <h1 className='text-center'>Mangas en Venta</h1>
      {selectedProduct ? (
        <div className="product-detail">
          <div className="product-image">
            <img src={selectedProduct.imagen} alt={selectedProduct.titulo} />
          </div>

          <div className="product-info">
            <h1>Titulo:</h1>
            <h2>{selectedProduct.titulo}</h2>
            <h3>Descripción:</h3>
            <p>{selectedProduct.descripcion}</p>
            <p>Precio:</p>
            <p>${selectedProduct.precio}</p>
            <hr />
            <div className='btn-container'>
                <button className='button-comprar'>Comprar</button>
                <button className='button-volver' onClick={() => setSelectedProduct(null)}>Volver</button>
            </div>
            
          </div>  
          
        </div>
      ) : (
        <div className="product-list">
          <div className='centered-container'>
            {productos.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onProductSelect={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Productos

