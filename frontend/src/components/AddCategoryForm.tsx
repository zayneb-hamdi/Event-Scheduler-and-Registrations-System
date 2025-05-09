import React, { useState } from 'react';
import api from '../api/api';

export default function AddCategoryForm({ onCategoryAdded }) {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await api.post('categories/', { name });
      onCategoryAdded(response.data);  
      setName('');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de la catégorie.");
    }
  };

  return (
    <div className='box'>
      <h4>Add a Category</h4>
      <input placeholder="category name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
