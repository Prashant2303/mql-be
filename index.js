import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
console.log(process.env.TEST_ENV);

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Hello to MQL API');
})
