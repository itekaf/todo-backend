import express from 'express';

import { auth } from '../../utils';
import TodosGetRouter from './todos.get';
import TodosPutRouter from './todos.put';
import TodosPostRouter from './todos.post';
import TodosDeleteRouter from './todos.delete';

const router = express.Router({ mergeParams: true });
router.use('*', auth.check);
router.get('*', TodosGetRouter);
router.put('*', TodosPutRouter);
router.post('*', TodosPostRouter);
router.delete('*', TodosDeleteRouter);

export default router;
