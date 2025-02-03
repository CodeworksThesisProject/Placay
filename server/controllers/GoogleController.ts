import { Request, Response } from "express";

export const getPhoto = async (req: Request, res: Response): Promise<void> => {
  const { photoReference } = req.query;
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  if (!photoReference) {
    res.status(400).json({ error: "Missing photo reference" });
    return;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();

    res.set("Content-Type", response.headers.get("content-type") || "image/jpeg");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Error fetching Google Photo:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
};