import express from 'express';
import signIn from './users/signin.js';
import signUp from './users/signup.js';
import user from './users/userById.js';
import lists from './lists/index.js';
import listById from './lists/listById.js';

const router = express.Router();

router.post('/users/signin', signIn);
router.post('/users/signup', signUp);
router.delete('/users/:id', user);
router.patch('/users/:id', user);

router.get('/lists/:id', listById);
router.delete('/lists/:id', listById);
router.patch('/lists/:id', listById);
router.get('/lists', lists);
router.post('/lists', lists);

export default router;