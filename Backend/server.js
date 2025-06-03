import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import the cors package
import { connectDB } from "./config/db.js";
import ProductRoute from "./routes/product.route.js";

dotenv.config();

const app = express();

// Enable CORS with specific options
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true // Allow cookies if needed
}));

app.use(express.json());
const Port = process.env.PORT || 8000;

app.use("/api/products", ProductRoute);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.listen(Port, async () => {
  await connectDB();
  console.log(`✅ Server started on port ${Port}`);
  console.log(`🔄 Allowing requests from: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
});