'use strict'
import { Request, Response } from 'express';
import { Tour } from "../models/tourModel";


export const getTours = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('method getTours accesed',req.body)
    const { user_id } = req.params;
    const tours = await Tour.find({ user_id });
    res.json(tours);
  } catch (error: any) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ error: error.message });
  }
}

export const postTours = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('method postTours accesed',req.body)
    const { user_id } = req.params;
    const {title, city, country, duration, locations}=req.body
    const newTour = new Tour({ user_id, title, city, country, duration, locations });
    await newTour.save();
    res.json(newTour);
  } catch (error: any) {
    console.error('Error saving the tour:', error);
    res.status(500).json({ error: error.message });
  }
}

export const editTours = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('method editTours accesed',req.body)
    const { tour_id } = req.params;
    const updates=req.body
    const updatedTour = await Tour.findByIdAndUpdate(tour_id,updates, { new: true });
    if (updatedTour) {
      res.json(updatedTour);
      return;
    }
  } catch (error: any) {
    console.error('Error updating the tour:', error);
    res.status(500).json({ error: error.message });
  }
}

export const deleteTours = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('method deleteTours accesed',req.body)
    const { tour_id } = req.params;
    const deletedTour = await Tour.findByIdAndDelete({ _id: tour_id });
    if (deletedTour) {
      res.json(deletedTour);
      return;
    }
  } catch (error: any) {
    console.error('Error deleting the tour:', error);
    res.status(500).json({ error: error.message });
  }
}