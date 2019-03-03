import express from 'express';

import ListModel from '../../models/Lists.Model';
import { answer } from '../../utils';

const resultArrayHandler = (req, res) => {
    ListModel
        .where('deleteAt').exists(false)
        .find({ users: req.user.id })
        .exec()
        .then((result) => {
            const lists = result.reduce((acum, list) => {
                const item = {
                    id: list._id,
                    name: list.name,
                    description: list.description,
                    users: list.users,
                    todos: list.todos,
                };
                acum.push(item);
                return acum;
            }, []);
            answer.data(200, lists, 'OK').send(res);
        })
        .catch(findError => answer.error(401, 'List not found', findError).send(res));
};

const resultOneHandler = (req, res) => {
    ListModel
        .where('deleteAt').exists(false)
        .findOne({ id: req.params.listId })
        .then((result) => {
            const lists = result.reduce((acum, list) => {
                const item = {
                    id: list._id,
                    name: list.name,
                    description: list.description,
                    users: list.users,
                    todos: list.todos,
                };
                acum.push(item);
                return acum;
            }, []);
            answer.data(200, lists, 'OK').send(res);
        })
        .catch(findError => answer.error(401, 'List not found', findError).send(res));
};

const router = express.Router();
router.get('/', resultArrayHandler);
router.get('/:listId', resultOneHandler);

export default router;
