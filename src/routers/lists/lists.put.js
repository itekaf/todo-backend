import express from 'express';

import ListModel from '../../models/Lists.Model';
import { answer, validate } from '../../utils';

const validateRules = [
    validate.rules.uuid(),
    validate.rules.name(),
    validate.rules.provider(),
    validate.rules.array('users'),
    validate.rules.exist('users'),
];

const resultHandler = (req, res) => {
    const listData = {
        id: req.params.listId,
        name: req.body.name,
        users: req.body.users,
        description: req.body.description,
    };
    ListModel
        .where('deleteAt').exists(false)
        .updateOne({ _id: req.params.listId }, listData)
        .then(() => answer.data(200, listData, 'OK').send(res))
        .catch(errSave => answer.error(401, 'Something wrong', errSave).send(res));
};

const router = express.Router();
router.put('/:listId',
    validateRules,
    validate.result,
    resultHandler);

export default router;
