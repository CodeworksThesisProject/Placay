'use strict'

import { Request, Response } from 'express';

export const autocomplete = async (req: Request, res: Response) => {
  try {
    const { input } = req.params;
    if (!input || typeof input !== 'string') {
      res.status(400).json({ error: "Missing or invalid 'input' parameter" });
      return;
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching autocomplete data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCoordinates = async (req: Request, res: Response) => {
  try {

    const { placeId  } = req.params;

    if (!placeId || typeof placeId !== 'string') {
      res.status(400).json({ error: "Missing or invalid 'input' parameter" });
      return;
    }
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};