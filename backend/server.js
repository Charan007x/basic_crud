import express from 'express';
import notesRoutes from './src/routes/notesRoutes.js';
import dotenv from 'dotenv';
import {connectDB} from './src/config/db.js';
dotenv.config();
connectDB();
const app=express();

app.use('/api/notes', notesRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});