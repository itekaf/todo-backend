import passport from 'passport';
import passportJWT from 'passport-jwt';

import config from './config';
import UserModel from '../../models/User.Model';

const { Strategy } = passportJWT;

const verifyFunction = (jwtPayload, cb) => UserModel
    .where('deleteAt').exists(false)
    .findOne({ _id: jwtPayload.id })
    .then(user => cb(null, user))
    .catch(err => cb(err));

passport.use('jwt', new Strategy(
    config.jwt,
    verifyFunction,
));
