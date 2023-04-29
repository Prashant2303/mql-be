import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './api/index.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}/`)
})

app.get('/', (req, res) => {
    res.send('Hello to MQL API');
})

app.use('/api', apiRouter);