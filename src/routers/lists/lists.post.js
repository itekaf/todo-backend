import express from 'express';

import ListService from '../../service/Lists.Service';
import { validate, answer } from '../../utils';

const validateRules = [
    validate.rules.uuid(),
    validate.rules.name(),
    validate.rules.provider(),
    validate.rules.array('users'),
];

const resultHandler = (req, res) => {
    const listData = {
        name: req.body.name,
        users: req.body.users,
        description: req.body.description,
    };
    const listInstanse = new ListService(listData);
    listInstanse
        .create()
        .then((result) => {
            const data = {
                id: result.id,
                name: result.name,
                users: result.users,
                description: result.description,
            };
            return answer.data(200, data, 'OK').send(res);
        })
        .catch(saveError => answer.error(401, 'Something wrong', saveError));
};

const router = express.Router();
router.post('/',
    validateRules,
    validate.result,
    resultHandler);

export default router;
