import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const FunctionTest: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [tourId, setTourId] = useState<string | null>(null);

  const handleCheckAuth = async () => {
    try {
      const res = await fetch('/api/check-auth', { method: 'GET', credentials: 'include' });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data));
    } catch (error) {
      setResponseMessage('Error checking auth: ' + error);
    }
  };

  const handleGetProfile = async () => {
    try {
      const res = await fetch('/user', { method: 'GET', credentials: 'include' });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseMessage('Error getting profile: ' + error);
    }
  };

  const handleGetFavorites = async () => {
    try {
      const res = await fetch('/user/favorite', { method: 'GET', credentials: 'include' });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseMessage('Error getting favorites: ' + error);
    }
  };

  const handleAddFavorite = async () => {
    try {
      const payload = { latitude: 48.8566, longitude: 2.3522, label: 'Paris' };
      const res = await fetch('/user/favorite', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setFavoriteId(data._id);
      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseMessage('Error adding favorite: ' + error);
    }
  };

  const handleDeleteFavorite = async () => {
    if (!favoriteId) {
      setResponseMessage('Can just delete a favorite recently created on this Website. Add one first');
      return;
    }
    try {
      const res = await fetch(`/user/favorite/${favoriteId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
      setFavoriteId(null);
    } catch (error) {
      setResponseMessage('Error deleting favorite: ' + error);
    }
  };

  const handleGetTours = async () => {
    if (!user) {
      setResponseMessage('User not available');
      return;
    }
    try {
      const res = await fetch(`/tour/${user.id}`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseMessage('Error getting tours: ' + error);
    }
  };

  const handleCreateTour = async () => {
    if (!user) {
      setResponseMessage('User not available');
      return;
    }
    try {
      const payload = {
        title: 'Test Tour',
        destination: 'Paris, France',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        days: []
      };
      const res = await fetch(`/tour/${user.id}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setTourId(data._id);
      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseMessage('Error creating tour: ' + error);
    }
  };

  const handleGetTourById = async () => {
    if (!tourId) {
      setResponseMessage('Can just delete a Tour recently created on this Website. Add one first');
      return;
    }
    try {
      const res = await fetch(`/tour/one/${tourId}`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseMessage('Error getting tour by ID: ' + error);
    }
  };

  const handleUpdateTour = async () => {
    if (!tourId) {
      setResponseMessage('Can just delete a Tour recently created on this Website. Add a tour first.');
      return;
    }
    try {
      const payload = { title: 'Updated Test Tour' };
      const res = await fetch(`/tour/${tourId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseMessage('Error updating tour: ' + error);
    }
  };

  const handleDeleteTour = async () => {
    if (!tourId) {
      setResponseMessage('Can just delete a Tour recently created on this Website. Create a tour first.');
      return;
    }
    try {
      const res = await fetch(`/tour/${tourId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
      setTourId(null);
    } catch (error) {
      setResponseMessage('Error deleting tour: ' + error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Function Test Page</h1>
      {!isAuthenticated && <p>You are not authenticated. Please log in.</p>}
      {isAuthenticated && (
        <div>
          <p>User: {user?.name} ({user?.email})</p>
          <button onClick={handleCheckAuth} style={{ marginRight: '10px'}}>Check Auth</button>
          <button onClick={handleGetProfile} style={{ marginRight: '10px'}}>Get Profile</button>
          <hr />
          <h2>Favorites</h2>
          <button onClick={handleGetFavorites} style={{ marginRight: '10px'}}>Get Favorites</button> 
          <button onClick={handleAddFavorite} style={{ marginRight: '10px'}}>Add Favorite</button> 
          <button onClick={handleDeleteFavorite} style={{ marginRight: '10px'}}>Delete Favorite</button>
          <hr />
          <h2>Tours</h2>
          <button onClick={handleGetTours} style={{ marginRight: '10px'}}>Get Tours</button>
          <button onClick={handleCreateTour} style={{ marginRight: '10px'}}>Create Tour</button>
          <button onClick={handleGetTourById} style={{ marginRight: '10px'}}>Get Tour By ID</button>
          <button onClick={handleUpdateTour} style={{ marginRight: '10px'}}>Update Tour</button>
          <button onClick={handleDeleteTour} style={{ marginRight: '10px'}}>Delete Tour</button>
        </div>
      )}
      <hr />
      <h2>Response:</h2>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
        {responseMessage}
      </pre>
    </div>
  );
};

export default FunctionTest;