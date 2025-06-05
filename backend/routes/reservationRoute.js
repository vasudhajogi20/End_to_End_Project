import express from 'express';
import ReservationModel from '../models/ReservationModel.js';
import { emitTableAvailabilityUpdate } from '../socket.js'; 
import { getUpdatedAvailability } from '../utils/availability.js';
import ErrorHandler from '../error/error.js';

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time } = req.body;

 
  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return next(new ErrorHandler("Please fill in all required fields!", 400));
  }

  try {
    
    const newReservation = await ReservationModel.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
    });

   
    const updatedAvailability = await getUpdatedAvailability(date, time);

   
    emitTableAvailabilityUpdate(updatedAvailability);

    res.status(201).json({
      success: true,
      message: "Reservation successful",
      data: newReservation,
    });
  } catch (error) {
   
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(messages.join(", "), 400));
    }

    next(error);
  }
});

export default router;
