import React, { useEffect, useState } from 'react';
import AddCategoryForm from '../components/AddCategoryForm';
import CategoryList from '../components/CategoryList';
import AddEventForm from '../components/AddEventForm';
import EventList from '../components/EventList';
import EventDetail from '../components/EventDetail';
import RegisterForm from '../components/RegisterForm';
import api from '../api/api';

export default function MainApp() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api.get('categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Erreur lors du chargement des catégories', err));
  }, []);

  return (
    <div className='app'>
      <div className="container">
      <AddCategoryForm onCategoryAdded={(newCat) => setCategories(prev => [...prev, newCat])} />
      <AddEventForm categories={categories} onEventAdded={() => {}} />
      <RegisterForm eventId={selectedEvent} />
      </div>

      <div className="container">
      <CategoryList onSelectCategory={setSelectedCategory} />
      </div>
      <div className="container">
      <EventList categoryId={selectedCategory} onSelectEvent={setSelectedEvent} />
      </div>
      <div className="container">
      <EventDetail eventId={selectedEvent} />
      </div>
      
    </div>
  );
}
