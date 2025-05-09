import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function EventDetail({ eventId }) {
  const [attendees, setAttendees] = useState([]);

  const fetchAttendees = () => {
    if (eventId) {
      api.get(`events/${eventId}/attendees/`)
      
        .then(
          res => 
            {console.log("Attendees fetched:", res.data);
              setAttendees(res.data)});
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, [eventId]);

  const handleCancel = async(attendeeId) => {
    console.log("Cancel attendee:", attendeeId, "for event:", eventId);
    try {
      // Appel à l'API pour annuler l'inscription
      await api.post('registrations/cancel/', {
        
        "attendee_id": attendeeId,
        "event_id":  eventId
      });
      alert("Inscription annulée !");
      fetchAttendees(); 
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'annulation.");
    }
  };

  return (
    <div className='box attendee'>
      <h3>Attendees</h3>
      
        {attendees.map((a) => (
          
          <li key={a.id}>
              {a.name} ({a.email})
            <button onClick={() => handleCancel(a.id)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </li>
        ))}
      
    </div>
  );
}
