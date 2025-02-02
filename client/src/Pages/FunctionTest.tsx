import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { Tour, Favorite } from '../types/allTypes';

function FunctionTest(): JSX.Element {
  const { isAuthenticated, user } = useAuth();
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [favoriteData, setFavoriteData] = useState({
    latitude: '48.8566',
    longitude: '2.3522',
    label: 'Paris',
  });
  const [favoritesList, setFavoritesList] = useState<Favorite[]>([]);
  const [tourData, setTourData] = useState({
    title: 'Test Tour',
    destination: 'Paris, France',
    startDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  });
  const [toursList, setToursList] = useState<Tour[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Auth & Profile
  const handleCheckAuth = async (): Promise<void> => {
    try {
      const res = await fetch('/api/check-auth', { method: 'GET', credentials: 'include' });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseMessage('Error checking auth: ' + error);
    }
  };

  const handleGetProfile = async (): Promise<void> => {
    try {
      const res = await fetch('/user', { method: 'GET', credentials: 'include' });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseMessage('Error getting profile: ' + error);
    }
  };

  // Favorites
  const handleFavoriteInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFavoriteData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFavorite = async (): Promise<void> => {
    const latitude = parseFloat(favoriteData.latitude);
    const longitude = parseFloat(favoriteData.longitude);
    if (isNaN(latitude) || isNaN(longitude)) {
      setResponseMessage("Invalid latitude or longitude");
      return;
    }
    try {
      const payload = { latitude, longitude, label: favoriteData.label };
      const res = await fetch('/user/favorite', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
      await fetchFavorites();
    } catch (error) {
      setResponseMessage('Error adding favorite: ' + error);
    }
  };

  const fetchFavorites = useCallback(async (): Promise<void> => {
    try {
      const res = await fetch('/user/favorite', { method: 'GET', credentials: 'include' });
      const data = await res.json();
      setFavoritesList(data.favorites || data);
    } catch (error) {
      setResponseMessage('Error fetching favorites: ' + error);
    }
  }, []);

  const handleDeleteFavorite = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/user/favorite/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
      await fetchFavorites();
    } catch (error) {
      setResponseMessage('Error deleting favorite: ' + error);
    }
  };

  // Tours
  const handleTourInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setTourData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateTour = async (): Promise<void> => {
    if (!user) {
      setResponseMessage('User not available');
      return;
    }
    if (!tourData.title || !tourData.destination || !tourData.startDate || !tourData.endDate) {
      setResponseMessage("Please fill in all tour fields");
      return;
    }
    try {
      const payload = { ...tourData, days: [] };
      const res = await fetch(`/tour/${user.id}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
      await fetchTours();
    } catch (error) {
      setResponseMessage('Error creating tour: ' + error);
    }
  };

  const fetchTours = useCallback(async (): Promise<void> => {
    if (!user) return;
    try {
      const res = await fetch(`/tour/${user.id}`, { method: 'GET', credentials: 'include' });
      const data = await res.json();
      setToursList(data);
    } catch (error) {
      setResponseMessage('Error fetching tours: ' + error);
    }
  }, [user]);

  const handleGetTourById = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/tour/one/${id}`, { method: 'GET', credentials: 'include' });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseMessage('Error getting tour by ID: ' + error);
    }
  };

  const handleUpdateTour = async (id: string): Promise<void> => {
    try {
      const payload = { title: 'Updated Tour Title' };
      const res = await fetch(`/tour/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
      await fetchTours();
    } catch (error) {
      setResponseMessage('Error updating tour: ' + error);
    }
  };

  const handleDeleteTour = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/tour/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
      await fetchTours();
    } catch (error) {
      setResponseMessage('Error deleting tour: ' + error);
    }
  };

  // Upload Profile Picture
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadProfileImage = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!selectedFile) {
      setResponseMessage("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    try {
      const res = await fetch("/user/profileimage", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponseMessage("Error uploading profile image: " + error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchFavorites();
      fetchTours();
    }
  }, [isAuthenticated, user, fetchTours, fetchFavorites]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Function Test Page</h1>
      {!isAuthenticated && <p>You are not authenticated. Please log in</p>}
      {isAuthenticated && (
        <div>
          <p>User: {user?.name} ({user?.email})</p>
          <button onClick={handleCheckAuth} style={{ marginRight: '10px' }}>Check Auth</button>
          <button onClick={handleGetProfile} style={{ marginRight: '10px' }}>Get Profile</button>
          {user?.profileImage && (
            <img src="http://localhost:3000/uploads/{user.profileImage}" alt="Profile Image" className="h-10 w-10 rounded-full fixed top-4 right-4"/>
          )}
          <hr />
          <h2>Favorites</h2>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="label"
              placeholder="Label"
              value={favoriteData.label}
              onChange={handleFavoriteInputChange}
              className="border border-black mr-2 px-2 py-1"
            />
            <input
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={favoriteData.latitude}
              onChange={handleFavoriteInputChange}
              className="border border-black mr-2 px-2 py-1"
            />
            <input
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={favoriteData.longitude}
              onChange={handleFavoriteInputChange}
              className="border border-black mr-2 px-2 py-1"
            />
            <button onClick={handleAddFavorite} style={{ marginRight: '10px' }}>Add to Favorite</button>
          </div>
          <div>
            <h3>Favorites List:</h3>
            <ul>
              {favoritesList.map((fav) => (
                <li key={fav._id}>
                  {fav.label} ({fav.latitude}, {fav.longitude}) | Favorite _id: {fav._id} |
                  <button onClick={() => handleDeleteFavorite(fav._id)} style={{ marginLeft: '10px' }}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <h2>Tours</h2>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="title"
              placeholder="Tour Title"
              value={tourData.title}
              onChange={handleTourInputChange}
              className="border border-black mr-2 px-2 py-1"
            />
            <input
              type="text"
              name="destination"
              placeholder="Destination (City, Country)"
              value={tourData.destination}
              onChange={handleTourInputChange}
              className="border border-black mr-2 px-2 py-1"
            />
            <input
              type="text"
              name="startDate"
              placeholder="Start Date (YYYY-MM-DD)"
              value={tourData.startDate}
              onChange={handleTourInputChange}
              className="border border-black mr-2 px-2 py-1"
            />
            <input
              type="text"
              name="endDate"
              placeholder="End Date (YYYY-MM-DD)"
              value={tourData.endDate}
              onChange={handleTourInputChange}
              className="border border-black mr-2 px-2 py-1"
            />
            <button onClick={handleCreateTour} style={{ marginRight: '10px' }}>Add to Tour</button>
          </div>
          <div>
            <h3>Tours List:</h3>
            <ul>
              {toursList.map((tour) => (
                <li key={tour._id}>
                  {tour.title} - {tour.destination} | ({tour.startDate} to {tour.endDate}), Duration: {tour.duration} | Tour _ID: {tour._id}, Tour User ID: {tour.user_id} |
                  <button onClick={() => handleGetTourById(tour._id)} style={{ marginLeft: '10px' }}>Get Tour by ID</button>
                  <button onClick={() => handleUpdateTour(tour._id)} style={{ marginLeft: '10px' }}>Update</button>
                  <button onClick={() => handleDeleteTour(tour._id)} style={{ marginLeft: '10px' }}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <h2>Upload Profile Image</h2>
          <form onSubmit={handleUploadProfileImage} encType="multipart/form-data">
            <input type="file" name="profileImage" onChange={handleFileChange} />
            <button type="submit">Upload Profile Image</button>
          </form>
        </div>
      )}
      <hr />
      <h2>Response:</h2>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
        {responseMessage}
      </pre>
    </div>
  );
}

export default FunctionTest;