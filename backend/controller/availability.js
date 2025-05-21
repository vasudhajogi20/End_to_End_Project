
import { Reservation } from "./models/reservationSchema.js";
 

const TOTAL_TABLES = 10;

export async function getUpdatedAvailability(date, time) {
  try {

    const bookedCount = await Reservation.countDocuments({ date, time });

    
    const availableTables = TOTAL_TABLES - bookedCount;

    return {
      date,
      time,
      availableTables: availableTables > 0 ? availableTables : 0,
    };
  } catch (error) {
    console.error("Error fetching availability:", error);
    throw error;
  }
}
