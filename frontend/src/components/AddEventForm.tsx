import React, { useState } from 'react';
import api from '../api/api';

export default function AddEventForm({ categories, onEventAdded }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await api.post('events/', 
        {
            "title":title,
            "date": date,
            "location": location,
            "category_id": category
        
      });
      onEventAdded(response.data);
      setTitle('');
      setDate('');
      setCategory('');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de l'événement.");
    }
  };

  return (
    <div className='box'>
      <h4>Add an Event</h4>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
