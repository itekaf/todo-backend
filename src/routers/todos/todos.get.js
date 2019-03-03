import express from 'express';

import TodosModel from '../../models/Todos.Model';
import { answer } from '../../utils';

const resultArrayHandler = (req, res) => {
    TodosModel
        .where('deleteAt').exists(false)
        .find({ list: req.params.listId })
        .exec()
        .then((result) => {
            const todos = result.map(todo => ({
                id: todo.id,
                name: todo.name,
                description: todo.description,
                dateTo: todo.dateTo,
                done: todo.done,
                listId: todo.list,
            }));
            answer.data(200, todos, 'OK').send(res);
        })
        .catch(findError => answer.error(401, 'List not found', findError).send(res));
};

const resultOneHandler = (req, res) => {
    TodosModel
        .where('deleteAt').exists(false)
        .findOne({ id: req.params.todoId, list: req.params.listId })
        .then(result => answer.data(200, result, 'OK').send(res))
        .catch(findError => answer.error(401, 'List not found', findError).send(res));
};


const router = express.Router({ mergeParams: true });
router.get('/', resultArrayHandler);
router.get('/:todoId', resultOneHandler);
export default router;
