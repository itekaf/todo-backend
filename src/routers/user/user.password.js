import express from 'express';

import { validate, answer, convert } from '../../utils';
import UserService from '../../service/User.Service';

const validateRules = [
    validate.rules.uuid(),
    validate.rules.provider(),
    validate.rules.password.current('newPassword'),
    validate.rules.password.confirm('newPasswordConfirmation', 'newPassword'),
];

const resultHandler = (req, res) => {
    const userData = {
        username: convert.lowerCase(req.user.username),
        password: req.user.password,
    };

    const userInstance = new UserService(userData);
    userInstance.changePassword(req.body.newPassword)
        .then(() => answer.message(201, 'Password successful changed').send(res))
        .catch(errorChange => answer.error(401, 'Something wrong. Try again', errorChange).send(res));
};

const router = express.Router();
router.post('/change',
    validateRules,
    validate.result,
    resultHandler);

export default router;
