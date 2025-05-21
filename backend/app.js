import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoutes.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/v1/reservation", reservationRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
