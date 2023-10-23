import React from 'react';

const ProductSorter = ({ onSortChange }) => {
  return (
    <div className="product-sorter">
      <label htmlFor="sortSelect">Ordenar por: </label>
      <select 
        id="sortSelect" 
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default"></option>
        <option value="priceAsc">Precio: Menor a Mayor</option>
        <option value="priceDesc">Precio: Mayor a Menor</option>
        <option value="nameAsc">Nombre: A-Z</option>
        <option value="nameDesc">Nombre: Z-A</option>
      </select>
    </div>
  );
}

export default ProductSorter;
