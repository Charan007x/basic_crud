import express from 'express';
import notesRoutes from './src/routes/notesRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './src/config/db.js';
import userRoutes  from './src/routes/userRoutes.js';
dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/notes', notesRoutes);
app.use('/api/auth', userRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});