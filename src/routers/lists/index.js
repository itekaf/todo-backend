import express from 'express';

import { auth } from '../../utils';

import TodosRouter from '../todos';
import ListsGetRouter from './lists.get';
import ListsPutRouter from './lists.put';
import ListsPostRouter from './lists.post';
import ListsDeleteRouter from './lists.delete';

const router = express.Router();
router.use('*', auth.check);
router.get('*', ListsGetRouter);
router.put('*', ListsPutRouter);
router.post('*', ListsPostRouter);
router.delete('*', ListsDeleteRouter);
router.use('/:listId/todos', TodosRouter);

export default router;
