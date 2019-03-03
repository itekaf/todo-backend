import passportJWT from 'passport-jwt';

import config from '../../config';

const ExtractJWT = passportJWT.ExtractJwt;

export default {
    github: {
        clientID: config.secret.github.id,
        clientSecret: config.secret.github.token,
    },
    local: {
        usernameField: 'username',
        passwordField: 'password',
    },
    jwt: {
        secretOrKey: config.secret.jwt,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
};
