import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import router from './routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file');
});
app.use(notFound);

app.use(globalErrorHandler);
export default app;
