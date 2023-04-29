import express from 'express';
import signIn from './users/signin.js';
import signUp from './users/signup.js';
import listById from './lists/listById.js';

const router = express.Router();

router.post('/users/signin', signIn);
router.post('/users/signup', signUp);

router.get('/lists/:id', listById);

export default router;