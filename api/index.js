import express from 'express';
import signIn from './users/signin.js';

const router = express.Router();

router.post('/users/signin', signIn);

export default router;