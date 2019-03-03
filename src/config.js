import dotenv from 'dotenv';

dotenv.config();

export default {
    app: {
        db: `${process.env.DB_URI}/${process.env.DB_NAME}` || 'mongodb://localhost:27017/app',
        port: process.env.PORT || 4000,
    },
    client: {
        uri: process.env.CLIENT_URI || 'http://localhost:4200',
        redirects: {
            github: '/signin/check',
        },
    },
    secret: {
        github: {
            id: process.env.GH_ID,
            token: process.env.GH_SECRET,
        },
        jwt: process.env.JWT_SECRET || '1234567',
        session: process.env.SESSION_SECRET || '1234567',
        password: process.env.PASSWORD_SALT_ROUNDS || 10,
    },
};
