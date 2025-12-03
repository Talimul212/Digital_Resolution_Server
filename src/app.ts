/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://digital-resolution-management-syste-tau.vercel.app',
    ],
    credentials: true, // if you need cookies/auth headers
  }),
);

// application routes
app.use('/api/v1', router);

//server call
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live',
  });
});
app.use(globalErrorHandler as any);

//Not Found
app.use(notFound as any);

export default app;
