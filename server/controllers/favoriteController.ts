import { Request, Response } from "express";
import { Favorite } from "../models/favoriteModel";
import { User, IFavorite } from "../models/userModel";

// GET /user/favorite
export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;
    const favorites = await Favorite.find({ user: userId });
    res.json(favorites);
  } catch (error: any) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: error.message });
  }
};

// POST /user/favorite
export const postFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user._id;
    const { label, latitude, longitude, googlePOIId } = req.body;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      res.status(401).json({ error: "Invalid location data" });
      return;
    }

    const newFavorite = new Favorite({
      user: userId,
      label,
      latitude,
      longitude,
      googlePOIId,
    });

    await newFavorite.save();
    res.json(newFavorite);
  } catch (error: any) {
    console.error("Error creating favorite:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE /user/favorite/:id
export const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user._id;
    const favoriteId = req.params.id;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const favoriteIndex = await Favorite.findOne({ _id: favoriteId, user: user });

    if (!favoriteIndex) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    await Favorite.findOneAndDelete({ _id: favoriteId, user: user });

    res.status(200).json({ message: "Favorite removed successfully", favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};