import express from 'express';

import TodosModel from '../../models/Todos.Model';
import { validate, answer } from '../../utils';

const validateRules = [
    validate.rules.uuid(),
    validate.rules.name(),
    validate.rules.provider(),
];

const resultHandler = (req, res) => {
    const todoData = {
        id: req.params.todoId,
        name: req.body.name,
        done: !!req.body.done,
        dateTo: req.body.dateTo,
        listId: req.params.listId,
        description: req.body.description,
    };
    const todoQuery = {
        _id: req.params.todoId,
        list: req.params.listId,
    };
    TodosModel
        .where('deleteAt').exists(false)
        .updateOne(todoQuery, todoData)
        .then(() => answer.data(200, todoData, 'OK').send(res))
        .catch(errSave => answer.error(401, 'Something wrong', errSave).send(res));
};

const router = express.Router({ mergeParams: true });
router.put('/:todoId',
    validateRules,
    validate.result,
    resultHandler);

export default router;
