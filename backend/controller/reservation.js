import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";
import { emitTableAvailabilityUpdate } from "../server.js";
import { getUpdatedAvailability } from "../utils/availability.js";

export const sendReservation = async (req, res, next) => {
    const { firstName, lastName, email, phone, date, time } = req.body;

    if (!firstName || !lastName || !email || !phone || !date || !time) {
        return next(new ErrorHandler("Please fill full reservation form!", 400));
    }

    try {
        const reservation = await Reservation.create({ firstName, lastName, email, phone, date, time });

        
        const updatedAvailability = await getUpdatedAvailability(date, time);
        emitTableAvailabilityUpdate(updatedAvailability);

        res.status(200).json({
            success: true,
            message: "Reservation sent successfully",
            reservation,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return next(new ErrorHandler(validationErrors.join(", "), 400));
        }
        return next(error);
    }
};
