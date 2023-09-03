import * as express from 'express';
import * as dotenv from "dotenv";
import { Express, Request, Response } from "express";
import helmet from "helmet";

import "reflect-metadata";
import { AppDataSource } from "./data-source"
import userRoutes from './routes/user';

const PORT: number = parseInt(process.env.PORT) || 5000;

dotenv.config();

import { User } from "./entity/User"

// establish database connection
// AppDataSource
//   .initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!")
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization:", err)
//   })

const app: Express = express();

app.use(helmet());

app.use(express.json());
app.use('/api/users', userRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`App listing to port ${PORT}`));
