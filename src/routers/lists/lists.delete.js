import express from 'express';

import ListModel from '../../models/Lists.Model';
import { answer } from '../../utils';

const resultHandler = (req, res) => {
    const listData = { deleteAt: new Date() };
    ListModel
        .updateOne({ _id: req.params.listId }, listData)
        .then(result => answer.data(200, result, 'OK').send(res))
        .catch(updateErr => answer.error(401, 'Something wrong', updateErr).send(res));
};

const router = express.Router();
router.delete('/:listId', resultHandler);

export default router;
