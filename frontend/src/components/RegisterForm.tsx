import React, { useState } from 'react';
import api from '../api/api';

export default function RegisterForm({ eventId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
     
      let attendee;
      const response = await api.get(`attendees/?search=${encodeURIComponent(email)}`);
  
      if (response.data.length > 0) {
       
        attendee = response.data[0];
      } else {
        
        const newAttendee = await api.post('attendees/', { name, email });
        attendee = newAttendee.data;
      }
  
     
      await api.post('registrations/', {
       
      
          "attendee_id":attendee.id,
          "event_id": eventId
      
      });
  
      alert("Inscription réussie !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'inscription.");
    }
  };
  

  return (
    <div className='box'>
      <h4>Register</h4>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
