import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductSorter from '../components/ProductSorter';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const url = "https://backend-mundomanga.onrender.com";

  const [searchParams, setSearchParams] = useState({
    minPrice: '',
    maxPrice: '',
    name: '',
    editorial: ''
  });

  const obtenerProductos = async (params = {}) => {
    const endpoint = "/productos";
    try {
      const response = await axios.get(url + endpoint, { params });
      setProductos(response.data);
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    obtenerProductos(searchParams);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleSortChange = (sortOption) => {
    let sortedProducts = [...productos];
    switch (sortOption) {
      case 'priceAsc':
        sortedProducts.sort((a, b) => a.precio - b.precio);
        break;
      case 'priceDesc':
        sortedProducts.sort((a, b) => b.precio - a.precio);
        break;
      case 'nameAsc':
        sortedProducts.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'nameDesc':
        sortedProducts.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
      default:
        // No hacer nada o puedes revertir a la lista original
        break;
    }
    setProductos(sortedProducts);
  };
  return (
    <div>
      <h1 className='text-center'>Mangas en Venta</h1>
      <ProductSorter onSortChange={handleSortChange} /> 
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

export default Productos;
