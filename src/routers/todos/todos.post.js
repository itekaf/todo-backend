import express from 'express';

import TodosService from '../../service/Todos.Service';

import { validate, answer } from '../../utils';

const validateRules = [
    validate.rules.uuid(),
    validate.rules.name(),
    validate.rules.provider(),
];

const resultHandler = (req, res) => {
    const todoData = {
        name: req.body.name,
        dateTo: req.body.dateTo || null,
        list: req.params.listId,
        description: req.body.description || null,
    };
    const todosInstanse = new TodosService(todoData);
    todosInstanse
        .create()
        .then((result) => {
            const data = {
                id: result.id,
                name: result.name,
                listId: result.list,
                dateTo: result.dateTo,
                description: result.description,
            };
            return answer.data(200, data, 'OK').send(res);
        })
        .catch(saveError => answer.error(401, 'Something wrong', saveError));
};

const router = express.Router({ mergeParams: true });
router.post('/',
    validateRules,
    validate.result,
    resultHandler);

export default router;
