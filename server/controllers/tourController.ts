import { Request, Response } from "express";
import { Tour } from "../models/tourModel";
import { User } from "../models/userModel";

// GET /tour/:user_id -> get all tours of a user
export const getTours = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user._id;
  const tours = await Tour.find({ user_id: userId });
  res.json(tours);
};

// GET /tour/tours -> get all tours 
export const getAllTours = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit =  20;
  const skip = (page - 1) * limit;

  const tours = await Tour.find().skip(skip).limit(limit);
  res.json(tours);
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

// POST /tour/like/:userId/:tourId user should be login just login user can like
export const likedTours = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tourId, userId } = req.params;

    const user = await User.findById(userId);
    const tour = await Tour.findById(tourId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    if (!tour) {
      res.status(404).json({ error: "Tour not found" });
      return;
    }

    if (!user.likedTours) {
      user.likedTours = [];
    }

    const tourIndex = user.likedTours.indexOf(tourId as any);
    if (tourIndex === -1) {
      user.likedTours.push(tourId as any);
      tour.like = (Number(tour.like) || 0) + 1;
    } else {
      user.likedTours.splice(tourIndex, 1);
      if (Number(tour.like) > 0) tour.like = Number(tour.like) - 1;
    }

    await user.save();
    await tour.save();

    res.json({ message: "Like updated", numLikedTours: user.likedTours.length });
  } catch (error: any) {
    console.error("Error updating like:", error);
    res.status(500).json({ error: error.message });
  }
};
// Get /tour/like/:tourId just get numbers
export const getNumberOfLikes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tourId } = req.params;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      res.status(404).json({ error: "Tour not found" });
      return;
    }
    
    res.json({ message: "number of liked sent", tourLiked: tour.like });
  } catch (error: any) {
    console.error("Error updating like:", error);
    res.status(500).json({ error: error.message });
  }
};