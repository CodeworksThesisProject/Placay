'use strict'
import { Request, Response } from 'express';
const Amadeus = require("amadeus");
import { City } from "../models/cities";

const clientId = process.env.DATABASE || 'FKtuY45G6eciBYAUIu2x6Pd3yA08USnd'
const clientSecret = process.env.DATABASE || 'VAhzrsx5LCdEGQ4p'

export const getPointsOfInterest = async (req: Request, res: Response): Promise<void> => {
  console.log("receiving request")
  try {
    const { latitude, longitude, radius = 10 } = req.body;
    const { cityName } = req.params;
    const savedCity = await City.findOne({ cityName });
    if (savedCity) {
      console.log(savedCity);
      res.json(savedCity.pointsOfInterest);
    } else {
      const pointsOfInterest = await coordinates(latitude, longitude, radius);
      if (pointsOfInterest) {
        await saveData(cityName, latitude, longitude, pointsOfInterest);
        res.json(pointsOfInterest);
      } else {
        res.json("Unable to reach API data");
      }
    }
  } catch (error: any) {
    console.error('Error fetching points of interest:', error);
    res.status(500).json({ error: error.message });
  }
};

const amadeus = new Amadeus({
  clientId: clientId,
  clientSecret: clientSecret,
});

async function coordinates(latitude: number = 41.397158, longitude: number = 2.160873, radius: number = 1): Promise<any> {
  console.log("Enviando solicitud a Amadeus...");
  let response = [];

  let pointsOfInterest = [];
  try {
    console.log("The search radius is: ",radius)
    const poiResponse = await amadeus.referenceData.locations.pointsOfInterest.get({
      latitude: latitude,
      longitude: longitude,
      radius: radius,
    });
    pointsOfInterest = poiResponse.data;
  } catch (error) {
    console.error('Error fetching Points of Interest:', error);
  }

  let activities = [];
  try {
    const activitiesResponse = await amadeus.shopping.activities.get({
      latitude: latitude,
      longitude: longitude,
      radius: radius,
    });
    activities = activitiesResponse.data;
  } catch (error) {
    console.error('Error fetching Activities:', error);
  }

  response = [...pointsOfInterest, ...activities];
  return response
}

async function saveData(cityName: string, latitude: number, longitude: number, pointsOfInterest: any): Promise<void> {
  try {
    const newCity = new City({ cityName, latitude, longitude, pointsOfInterest });
    await newCity.save();
    console.log('City data saved successfully.');
  } catch (error) {
    console.error('Error saving city data:', error);
  }
}

