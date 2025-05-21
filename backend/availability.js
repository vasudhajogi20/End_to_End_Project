
import { Reservation } from "./models/reservationSchema.js";
 

const TOTAL_TABLES = 10;  // Set your restaurant's total table count here

export async function getUpdatedAvailability(date, time) {
  try {
    // Count how many bookings exist for the date and time
    const bookedCount = await Reservation.countDocuments({ date, time });

    // Calculate how many tables are available
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
