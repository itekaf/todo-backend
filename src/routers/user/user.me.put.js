import express from 'express';

import UserService from '../../service/User.Service';
import {
    validate, answer, auth, convert,
} from '../../utils';

const validateRules = [
    validate.rules.uuid(),
    validate.rules.provider(),
];

const resultHandler = (req, res) => {
    const userData = {
        id: req.user.id,
        name: req.body.name,
        username: convert.lowerCase(req.user.username),
        password: req.user.password,
        providers: req.user.providers,
    };

    const token = auth.generateToken(userData);
    const userInstance = new UserService(userData);
    userInstance.changeInfo()
        .then(() => answer.token(200, token, 'User saved').send(res))
        .catch(errorChange => answer.error(401, 'Something wrong. Try again', errorChange).send(res));
};

const router = express.Router();
router.put('/',
    validateRules,
    validate.result,
    resultHandler);

export default router;
