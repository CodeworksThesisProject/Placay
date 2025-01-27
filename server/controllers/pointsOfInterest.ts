'use strict'
import { Request, Response } from 'express';
const Amadeus = require("amadeus");
import { City } from "../models/cities";

const clientId = process.env.DATABASE || 'FKtuY45G6eciBYAUIu2x6Pd3yA08USnd'
const clientSecret = process.env.DATABASE || 'VAhzrsx5LCdEGQ4p'

export const getPointsOfInterest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { latitude, longitude, radius = 2 } = req.body;
    const { name } = req.params;
    const city = await City.findOne({ name });
    if (city) {
      console.log(city);
      res.json(city);
    } else {
      const data = await coordinates(latitude, longitude, radius);
      console.log(data);
      if (data) {
        await saveData(name, latitude, longitude, data);
        res.json(data);
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

async function coordinates(latitude: number = 41.397158, longitude: number = 2.160873, radius: number = 2): Promise<any> {
  try {
    console.log("Enviando solicitud a Amadeus...");
    const response = await amadeus.referenceData.locations.pointsOfInterest.get(
      {
        latitude: latitude,
        longitude: longitude,
        radius: radius,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

/*   async function square(north: number = 41.397158, west: number = 2.160873, south: number = 41.394582, east: number = 2.177181): Promise<any> {
    try {
      console.log("Enviando solicitud a Amadeus...");
      // What are the popular places in Barcelona? (based on a square)
      const response =
        await amadeus.referenceData.locations.pointsOfInterest.bySquare.get({
          north: north,
          west: west,
          south: south,
          east: east,
        });
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  } */

async function saveData(city: string, latitude: number, longitude: number, pointsOfInterest: any): Promise<void> {
  try {
    const newCity = new City({ city, latitude, longitude, pointsOfInterest });
    await newCity.save();
    console.log('City data saved successfully.');
  } catch (error) {
    console.error('Error saving city data:', error);
  }
}

