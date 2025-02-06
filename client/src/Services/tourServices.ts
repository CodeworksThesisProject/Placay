'use strict'
export async function getTours(user_id: string): Promise<any> {
  try {
    const response = await fetch(`http://localhost:3000/tour/${user_id}`);
    const userTours = await response.json();

    return userTours;
  } catch (err) {
    console.error('Error fetching the users tours:', err);
    return { error: 'Error fetching user tours' };
  }
}
//await getTours('603d2fbb4f6d5b29e8b49d49')

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
/*
const user_id = "12345";
const title = "Tour a la montaña";
const city = "Barcelona";
const country = "España";
const duration = "3 días";
const locations = [
  { name: "Monte Everest", coordinates: { lat: 27.9881, lng: 86.9250 } },
  { name: "Kilimanjaro", coordinates: { lat: -3.0674, lng: 37.3556 } }
];
await postTours(user_id, title, city, country, duration, locations)
*/

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
//await editTours('679c92c03d750045c2c31c38',"New Title", undefined, "New Country", "3 days", undefined);
//set undefined in the fields you don't want to modify

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
//await deleteTours('679c926ecbb6cd198a40b6cf');
