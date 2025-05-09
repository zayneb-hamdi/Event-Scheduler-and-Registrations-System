import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function EventList({ categoryId, onSelectEvent }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (categoryId) {
      api.get(`events/by_category/?category=${categoryId}`)
        .then(res => setEvents(res.data));
    }
  }, [categoryId]);

  return (
    <div className='box'>
      <h3>Events</h3>
      {events.map(event => (
        <div key={event.id} onClick={() => onSelectEvent(event.id)} style={{ cursor: 'pointer' }}>
          <strong>{event.title}</strong> - {event.date} - {event.location}
        </div>
      ))}
    </div>
  );
}
