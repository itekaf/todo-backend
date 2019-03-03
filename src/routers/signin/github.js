import express from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

import { convert } from '../../utils';
import signinConfig from './config';
import globalConfig from '../../config';
import UserModel from '../../models/User.Model';
import UserService from '../../service/User.Service';

const convertData = (profile) => {
    const { emails } = profile;
    const username = convert.lowerCase(emails.length
        ? emails.pop().value : profile.username);
    const result = {
        username,
        id: profile.id,
        name: profile.displayName,
    };
    return result;
};

const verifyFunction = (security, _, profile, done) => {
    const userData = convertData(profile, security);
    UserModel
        .where('deleteAt').exists(false)
        .findOne({ username: userData.username }, (err, res) => {
            userData.name = res.name;
            userData.providers = res.providers;

            const userInstance = new UserService(userData);
            if (res) {
                userInstance.providers.set('github', { id: profile.id, token: security });
                userInstance
                    .changeInfo()
                    .then(() => done(null, res))
                    .catch(errChange => done(errChange));
            } else {
                userInstance
                    .create()
                    .then(() => done(null, res))
                    .catch(errSave => done(errSave));
            }
        });
};

passport.use('github', new GitHubStrategy(
    signinConfig.github,
    verifyFunction,
));

const authGitHubHandler = passport.authenticate('github');
const resultHandler = (_, res) => res.redirect(`${globalConfig.client.uri}/signin/check`);

const router = express.Router();
router.get('/', authGitHubHandler);
router.get('/callback', authGitHubHandler, resultHandler);

export default router;
