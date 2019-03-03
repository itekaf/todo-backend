import express from 'express';

import { answer } from '../../utils';
import UserModel from '../../models/User.Model';

const resultHandler = (req, res) => {
    const userData = { deleteAt: new Date() };
    const userQuery = { _id: req.user.id };

    UserModel
        .updateOne(userQuery, userData)
        .then(result => answer.data(200, result, 'OK').send(res))
        .catch(updateErr => answer.error(401, 'Something wrong', updateErr).send(res));
};

const router = express.Router();
router.delete('/', resultHandler);

export default router;
