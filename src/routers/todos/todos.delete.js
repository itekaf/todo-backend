import express from 'express';

import TodosModel from '../../models/Todos.Model';
import { answer } from '../../utils';

const resultHandler = (req, res) => {
    const todoData = { deleteAt: new Date() };
    const todoQuery = {
        _id: req.params.todoId,
        list: req.params.listId,
    };
    TodosModel
        .updateOne(todoQuery, todoData)
        .then(() => answer.data(200, req.params.todoId, 'OK').send(res))
        .catch(updateErr => answer.error(401, 'Something wrong', updateErr).send(res));
};

const router = express.Router({ mergeParams: true });
router.delete('/:todoId', resultHandler);
export default router;
