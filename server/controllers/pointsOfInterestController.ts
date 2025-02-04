'use strict'
import { Request, Response } from 'express';
import { City } from "../models/cityModel";
import { Details } from "../models/POIDetailsModel";

export const getPointsOfInterest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { latitude, longitude, radius = 20000 } = req.body;
    const { cityName } = req.params;

    if (cityName != "MovedMap") {
      const savedCity = await City.findOne({ cityName });
      if (savedCity) {
        res.json(savedCity.pointsOfInterest);
        return;
      }
    }
    const pointsOfInterest = await fetchPoints(latitude, longitude, radius);
    if (pointsOfInterest) {
      if (cityName != "MovedMap") {
        await saveCityData(cityName, latitude, longitude, pointsOfInterest);
      }
      res.json(pointsOfInterest);
    } else {
      res.json("Unable to reach API data");
    }

  } catch (error: any) {
    console.error('Error fetching points of interest:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { point_id } = req.params;
    const savedPOI = await Details.findOne({ point_id });
    if (savedPOI) {
      res.json(savedPOI);
      return;
    }
    const details = await fetchDetails(point_id);
    if (details) {
      await saveDetailsData(point_id, details.name, details.description, details.phone, details.images);
      res.json(details);
    } else {
      res.json("Unable to reach API data");
    }

  } catch (error: any) {
    console.error('Error fetching points of interest:', error);
    res.status(500).json({ error: error.message });
  }
};

async function fetchPoints(latitude: number = 51.5072178, longitude: number = -0.1275862, radius: number): Promise<any> {
  let pointsOfInterest = [];
  try {
    const types = ['tourist_attraction', 'museum', 'park', 'historic_site', 'art_gallery', 'amusement_park'];
    const promises = types.map(type =>
      fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
        .then(response => response.json())
        .then(data => data.results)
    );
    const allResults = await Promise.all(promises);
    const allPoints = allResults.flat();
    pointsOfInterest = allPoints.map((poi: any) => (
      {
        name: poi.name,
        id: poi.place_id,
        latitude: poi.geometry.location.lat,
        longitude: poi.geometry.location.lng,
      }
    ));
    return [...pointsOfInterest];
  } catch (error) {
    console.error('Error fetching Points of Interest:', error);
  }
}


async function fetchDetails(place_id: string): Promise<any> {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=name,editorial_summary,photos,formatted_phone_number&place_id=${place_id}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status !== "OK") {
      throw new Error(`Google Places API error: ${data.status}`);
    }
    const details = {
      name: data.result.name,
      description: data.result.editorial_summary ? data.result.editorial_summary.overview : 'No description available',
      phone: data.result.formatted_phone_number ? data.result.formatted_phone_number : 'No phone available',
      images: data.result.photos && data.result.photos.length > 0 ? data.result.photos : null,
    }
    return details;
  } catch (error) {
    console.error('Error fetching Points of Interest:', error);
  }
}

async function saveCityData(cityName: string, latitude: number, longitude: number, pointsOfInterest: any): Promise<void> {
  try {
    const newCity = new City({ cityName, latitude, longitude, pointsOfInterest });
    await newCity.save();
    console.log('City data saved successfully.');
  } catch (error) {
    console.error('Error saving city data:', error);
  }
}

async function saveDetailsData(point_id: string, name: string, description: string, phone: string, images: string[]): Promise<void> {
  try {
    const newDetails = new Details({ point_id, name, description, phone, images });
    await newDetails.save();
    console.log('Details saved successfully.');
  } catch (error) {
    console.error('Error saving details:', error);
  }
}