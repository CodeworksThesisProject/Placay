import { Request, Response } from "express";
import { Tour } from "../models/tourModel";

// GET /tour/:user_id -> get all tours of a user
export const getTours = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.params;
  const tours = await Tour.find({ user_id });
  res.json(tours);
};

//  POST /tour/:user_id -> Saves a new tour and needs title, destination, startDate, endDate, (optinal: days)
export const postTours = async (req: Request, res: Response): Promise<void> => {
  const { user_id } = req.params;
  const { title, destination, startDate, endDate, days } = req.body;

  if (!title || !destination || !startDate || !endDate) {
    res.status(400).json({ error: "Missing required fields: title, destination, startDate, endDate" });
    return;
  }

  const newTour = new Tour({
    user_id,
    title,
    destination,
    startDate,
    endDate,
    days: days || []
  });

  await newTour.save();
  res.json(newTour);
};

// PUT /tour/:tour_id -> Updates an existing tour
export const editTours = async (req: Request, res: Response): Promise<void> => {
  const { tour_id } = req.params;
  const updates = req.body;
  const updatedTour = await Tour.findByIdAndUpdate(tour_id, updates, { new: true });

  if (updatedTour) {
    res.json(updatedTour);
    return;
  }
  res.status(404).json({ error: "Tour not found" });
};

// DELETE /tour/:tour_id -> deletes a Tour
export const deleteTours = async (req: Request, res: Response): Promise<void> => {
  const { tour_id } = req.params;
  const deletedTour = await Tour.findByIdAndDelete(tour_id);

  if (deletedTour) {
    res.json(deletedTour);
    return;
  }
  res.status(404).json({ error: "Tour not found" });
};

// GET /one/:tour_id -> get one specific tour of a user
export const getTourById = async (req: Request, res: Response): Promise<void> => {
  const { tour_id } = req.params;
  const tour = await Tour.findById(tour_id);
  if (!tour) {
    res.status(404).json({ error: "Tour not found" });
    return;
  }
  res.json(tour);
};