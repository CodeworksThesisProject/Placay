export async function getPOIDetails(point_id: string) {
  try {
    const response = await fetch(`http://localhost:3000/city/${point_id}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      const errorMessage = `Error: ${error.message || 'Something went wrong'}`;
      console.error(errorMessage);
    }
  } catch (err) {
    console.error('Error:', err);
  }
};