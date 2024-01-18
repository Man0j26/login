// index.js

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from "cors";
import { MongoConnect } from "./DB.js";


import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// DataBase Connectioins
MongoConnect();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome To Your Node Server</h1>");
});

const server = app.listen(PORT, () =>
  console.log(`Listening to localhost:${PORT}`)
);

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/users', userRoutes);
