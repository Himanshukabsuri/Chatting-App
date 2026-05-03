import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/Database.js';
import userRouter from './routes/userRoutes.js';

dotenv.config(); // ✅ FIRST

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// routes call

app.use("/api/auth/",userRouter)

// Routes
app.get('/', (req, res) => {
  res.send("Server is live");
});

// Port from env
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});