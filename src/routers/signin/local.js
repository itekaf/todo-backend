import bcrypt from 'bcrypt';
import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserModel from '../../models/User.Model';
import signinConfig from './config';
import {
    validate, answer, auth, convert,
} from '../../utils';

const verifyFunction = (login, pass, done) => UserModel
    .where('deleteAt').exists(false)
    .findOne({ username: convert.lowerCase(login) }, (err, user) => {
        if (!user || err || !user.password || !bcrypt.compareSync(pass, user.password)) {
            return done(err, false);
        }
        return done(null, user);
    });

passport.use('local', new LocalStrategy(
    signinConfig.local,
    verifyFunction,
));

const validateRules = [
    validate.rules.uuid(),
    validate.rules.login(),
    validate.rules.provider(),
    validate.rules.password.current(),
];

const resultHandler = (req, res, next) => {
    passport.authenticate('local', { session: false }, (authError, userData) => {
        if (authError || !userData) {
            return answer.error(403, 'Invalid username or password!').send(res);
        }
        return req.logIn(userData, { session: false }, (loginError) => {
            const token = auth.generateToken(userData);
            const answerModel = loginError
                ? answer.error(403, 'Something wrong. Try again')
                : answer.token(201, token, 'Welcome');
            answerModel.send(res);
        });
    })(req, res, next);
};

const router = express.Router();
router.post('/',
    validateRules,
    validate.result,
    resultHandler);

export default router;
