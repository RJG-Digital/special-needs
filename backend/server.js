import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import colors from 'colors';
import bodyParser from 'body-parser';

import companyRoutes from './routes/companyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/companies', companyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`.green.inverse);
});
