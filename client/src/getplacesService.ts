'use strict'
export async function getPointsOfInterest(cityName: string, latitude: number, longitude: number, radius?: number): Promise<any> {
    try {
        const response = await fetch(`http://localhost:3000/city/${cityName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude,
                longitude,
                radius,
            }),
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
}