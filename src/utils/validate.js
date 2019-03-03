import { Types } from 'mongoose';
import { validationResult, check } from 'express-validator/check';

import answerUtils from './answer';

const validateRules = {
    login: (prop = 'username') => check(prop, 'Invalid login')
        .trim()
        .exists()
        .withMessage('Login is required')
        .isEmail()
        .withMessage('Login must be a email'),
    uuid: (prop = 'token') => check(prop, 'Don`t use cheats, please :)')
        .exists()
        .isUUID(),
    provider: (prop = 'provider', value = 'local') => check(prop, 'Unknow provider')
        .exists()
        .equals(value),
    mongoId: (prop = 'id') => check(prop, 'Unknow id')
        .exists()
        .custom(value => Types.ObjectId.isValid(value))
        .withMessage('Invalid user ID'),
    name: (prop = 'name') => check(prop)
        .trim()
        .exists()
        .withMessage('Name is required')
        .isLength({ min: 2 })
        .withMessage('Min length is 2'),
    description: (prop = 'description') => check(prop)
        .trim()
        .isLength({ min: 2 })
        .withMessage('Min length is 2'),
    exist: prop => check(prop)
        .exists()
        .withMessage(`${prop} is required`),
    dateTo: (prop = 'dateTo') => check(prop)
        .custom(value => Date.parse(value))
        .withMessage('It is not a date'),
    array: (prop, min = 1) => check(prop)
        .isArray()
        .withMessage(`${prop} is not array`)
        .isLength({ min })
        .withMessage(`${prop}, min length is ${min}`),
    password: {
        current: (prop = 'password') => {
            const validate = check(prop, 'Invalid password')
                .trim()
                .exists()
                .withMessage('Password is required')
                .isLength({ min: 5, max: 100 })
                .withMessage('Min length is 5 and max length is 100');
            return validate;
        },
        confirm: (prop = 'passwordConfirmation', current = 'password') => {
            const validate = check(prop,
                'Invalid confirm password. Confirm password field must have the same value as the password field')
                .trim()
                .exists()
                .withMessage('Confirm password is required')
                .custom((value, { req }) => value === req.body[current]);
            return validate;
        },
    },
};

const validateFunction = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const answer = answerUtils.errors(403, errors.array(), {}, x => x.msg);
        answer.send(res);
    } else {
        next();
    }
};

export default {
    rules: validateRules,
    result: validateFunction,
};
