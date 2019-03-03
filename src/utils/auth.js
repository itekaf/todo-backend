import jwt from 'jsonwebtoken';
import passport from 'passport';

import config from '../config';

const authUtils = {
    generateToken: (data) => {
        const answerData = {
            id: data.id || data._id,
            name: data.name,
            username: data.username,
            providers: data.providers,
        };
        const token = jwt.sign(answerData, config.secret.jwt);
        return token;
    },
    check: passport.authenticate('jwt', { session: false }),
};

export default authUtils;
