import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes.js';

import { morganMiddleware } from './middlewares/morgan.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morganMiddleware);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}/`)
})

app.get('/', (req, res) => {
    res.send('Hello to MQL API');
})

app.use('/api', apiRouter);