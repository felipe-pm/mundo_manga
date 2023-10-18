import React from 'react'
import '../assets/css/ProductCard.css'

const ProductCard = ({ producto, onProductSelect }) => {
  return (
    <div className="product-card">
      <img src={producto.imagen} alt={producto.titulo} />
      <h3>{producto.titulo}</h3>
      <p>Precio: ${producto.precio}</p>
      <div className='btn-container'>
        <button className='button-detalle' onClick={() => onProductSelect(producto)}>Ver detalles</button>
        <button className='button-comprar'>Comprar</button>
      </div>
    </div>
  )
}

export default ProductCard
