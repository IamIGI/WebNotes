import dotenv from 'dotenv';
//Load env variables -- have to be before imports, that could use this env variables
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/MongoDB.config';
import corsOptions from './config/cors.config';
import { errorHandler, unknownURLHandler } from './middleware/error.handler';
import cookieParser from 'cookie-parser';
import { HttpStatusCode } from './constants/error.constants';
import authRoutes from './routes/auth.route';
import authenticate from './middleware/authentication.middeleware';
import userRoutes from './routes/api/user.route';
import sessionRoutes from './routes/api/session.route';
import noteRoutes from './routes/api/note.route';
import { createServer } from 'http';
import websocket from './websocket/websocket';

const PORT = process.env.PORT || 4000;

//Connect to MongoDB;
mongoose.set('strictQuery', false);
connectDB();
const app = express();
const server = createServer(app);

app.use(express.json()); //allows to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); //parse FORM data
app.use(cors(corsOptions));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//ApiRoutes
app.get('/', (req, res, next) => {
  res.status(HttpStatusCode.OK).json({ status: 'Healthy' });
});
app.use('/auth', authRoutes);

//protected routes
app.use('/notes',authenticate, noteRoutes);
app.use('/user', authenticate, userRoutes);
app.use('/sessions', authenticate, sessionRoutes);

app.use(errorHandler);
app.all('*', unknownURLHandler);

mongoose.connection.once('open', () => {
  console.log('Successfully connected to MongoDB');

  //WS
  websocket.initWebSocketServer(server);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
