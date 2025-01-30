'use strict'
export async function getTours(user_id: string): Promise<any> {
  try {
    const response = await fetch(`http://localhost:3000/tour/${user_id}`);
    const userTours = await response.json();
    console.log(userTours)
    return userTours;
  } catch (err) {
    console.error('Error fetching the users tours:', err);
    return { error: 'Error fetching user tours' };
  }
}

export async function postTours(user_id: string, title: string, city: string, country: string, duration: string, locations: any[]): Promise<any> {
  try {
    const response = await fetch(`http://localhost:3000/tour/${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        city,
        country,
        duration,
        locations,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function editTours(tour_id: string, title?: string, city?: string, country?: string, duration?: string, locations?: []): Promise<any> {
  try {
    const response = await fetch(`http://localhost:3000/tour/${tour_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        city,
        country,
        duration,
        locations,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}

export async function deleteTours(tour_id: string): Promise<any> {
  try {
    const response =  await fetch(`http://localhost:3000/tour/${tour_id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
    return { error: 'Error deleting the tour' };
  }
}


const user_id = "603d2fbb4f6d5b29e8b49d49";  // ID de usuario de ejemplo (un ObjectId de MongoDB)
const title = "Tour por Barcelona";
const city = "Barcelona";
const country = "España";  // Aunque el campo 'country' debería ser un número (probablemente el código de país), aquí lo he puesto como texto para ilustrar
const duration = "5 días";
const locations = [
  { name: "Parc Güell", coordinates: { lat: 41.4145, lng: 2.1527 } },
  { name: "Sagrada Familia", coordinates: { lat: 41.4036, lng: 2.1744 } },
  { name: "La Rambla", coordinates: { lat: 41.3800, lng: 2.1910 } }
];

// Llamada a la función
postTours(user_id, title, city,country,duration, locations);




