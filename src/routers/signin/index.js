import express from 'express';
import passport from 'passport';

import checkRouter from './check';
import localRouter from './local';
import githubRouter from './github';
import UserModel from '../../models/User.Model';

import './jwt';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => done(err, user));
});

const router = express.Router();
router.use('/local', localRouter);
router.use('/check', checkRouter);
router.use('/github', githubRouter);

export default router;
