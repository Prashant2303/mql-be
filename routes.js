import express from 'express';
import signIn from './api/users/signin.js';
import signUp from './api/users/signup.js';
import user from './api/users/userById.js';
import lists from './api/lists/index.js';
import listById from './api/lists/listById.js';
import questions, { checkQuestion } from './api/questions/index.js';
import { getSuggestions } from './api/lists/suggestions.js';
import { getPublicListById, getPublicLists } from './api/public-lists/index.js';
import { dbHandler } from './api/helpers/db.js';
import { authCheck } from './middlewares/auth.js';

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

router.post('/questions/*', questions);
router.patch('/questions/*/*', questions);
router.delete('/questions/*/*', questions);

router.get('/suggestions/:listId', authCheck, dbHandler, getSuggestions);

router.get('/public-lists', dbHandler, getPublicLists);
router.get('/public-lists/:listId', dbHandler, getPublicListById);

router.post('/check-question', authCheck, dbHandler, checkQuestion);

export default router;