import React, { useState, useEffect } from 'react';
import { loadProducts } from '../services/products';

function List() {
  const [list, setList] = useState([]);
  const getProduct = async () => {
    const res = await loadProducts();
    console.log(res);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <h1>列表</h1>
    </div>
  );
}

export default List;
