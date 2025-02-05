import { Request, Response } from "express";
import { Tour } from "../models/tourModel";

// GET /tour/:user_id -> get all tours of a user
export const getTours = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user._id;
  const tours = await Tour.find({ user_id: userId });
  res.json(tours);
};

// GET /tour/tours -> get all tours 
export const getAllTours = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit =  10;
  const skip = (page - 1) * limit;

  const tours = await Tour.find().skip(skip).limit(limit);
  res.json(tours);
};

//  POST /tour/liked/:userId/:tourId
export const likedTours = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tourId, userId } = req.params;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      res.status(404).json({ error: "Tour not found" });
      return;
    }

    if (!tour.like) {
      tour.like = [];
    }

    const userIndex = tour.like.indexOf(userId);
    if (userIndex === -1) {
      tour.like.push(userId);
    } else {
      tour.like.splice(userIndex, 1);
    }

    await tour.save();

    res.json({ message: "Like updated", likes: tour.like.length });
  } catch (error: any) {
    console.error("Error updating like:", error);
    res.status(500).json({ error: error.message });
  }
};


//  POST /tour/:user_id -> Saves a new tour and needs title, destination, startDate, endDate, (optinal: days)
export const postTours = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user._id;
  const { title, destination, startDate, endDate, days } = req.body;

  if (!title || !destination || !startDate || !endDate) {
    res.status(400).json({ error: "Missing required fields: title, destination, startDate, endDate" });
    return;
  }

  const newTour = new Tour({
    user_id: userId,
    title,
    destination,
    startDate,
    endDate,
    days: days || []
  });

  await newTour.save();
  res.json(newTour);
};

// POST /tour/:user_id
export const addNewTour = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user._id;
    const { title, location, duration } = req.body;

    if (!location || location.length === 0) {
      return res.status(400).json({ message: "Tour must have at least one location." });
    }

    const newTour = new Tour({
      user_id,
      title,
      location,
      duration
    });

    await newTour.save();

    return res.status(201).json({ message: "Tour created successfully", tour: newTour });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Error creating the tour", error: error.message });
  }
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