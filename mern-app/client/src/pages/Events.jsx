import React, { useState, useEffect } from 'react';
import { eventAPI } from '../services/api';
import Navbar from '../components/Navbar';
import FloatingChatbot from '../components/FloatingChatbot';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventAPI.getAllEvents({ upcoming: true });
      setEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Upcoming Events</h1>
          
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading events...</p>
          ) : events.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No upcoming events at the moment.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {events.map((event) => (
                <div key={event._id} style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  {event.image && (
                    <img src={`http://localhost:5000${event.image}`} alt={event.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', marginBottom: '15px' }} />
                  )}
                  <h3 style={{ marginBottom: '10px', color: '#007bff' }}>{event.title}</h3>
                  <p><strong>Monastery:</strong> {event.monastery}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Type:</strong> {event.type}</p>
                  <p>{event.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>      
      <FloatingChatbot />    </>
  );
};

export default Events;
