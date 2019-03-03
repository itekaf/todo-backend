import express from 'express';

import { validate, answer, convert } from '../../utils';
import UserModel from '../../models/User.Model';
import UserService from '../../service/User.Service';

const validateRules = [
    validate.rules.uuid(),
    validate.rules.login(),
    validate.rules.provider(),
    validate.rules.password.current(),
    validate.rules.password.confirm(),
];

const resultHandler = (req, res) => {
    const userData = {
        name: req.body.name,
        username: convert.lowerCase(req.body.username),
        password: req.body.password,
        providers: new Map(),
    };
    userData.providers.set(req.body.provider, { token: req.body.token });

    UserModel.findOne({ username: userData.username }, (err, result) => {
        if (err || result) {
            answer.error(403, 'User is exist', err).send(res);
        }

        const userInstance = new UserService(userData);
        userInstance
            .create()
            .then(() => answer.message(200, 'You have successfully registered!').send(res))
            .catch(errorCreate => answer.error(401, 'Something wrong. Try again!', errorCreate).send(res));
    });
};

const router = express.Router();
router.post('/',
    validateRules,
    validate.result,
    resultHandler);

export default router;
