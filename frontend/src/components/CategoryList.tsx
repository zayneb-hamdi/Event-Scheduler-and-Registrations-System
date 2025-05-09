import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function CategoryList({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('access_token'); 

  useEffect(() => {
    api.get('categories/')
      .then(res => setCategories(res.data));
  }, []);

  return (
    <div className='box'>
      <h3>Categories</h3>
      {categories.map(cat => (
        <button key={cat.id} onClick={() => onSelectCategory(cat.id)}>
          {cat.name}
        </button>
      ))}
    </div>
  );
}
