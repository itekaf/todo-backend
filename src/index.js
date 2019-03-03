import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectMongo from 'connect-mongo';
import expressSession from 'express-session';

import config from './config';
import * as Routers from './routers/index';

const app = express();

// DataBase
const MongoStore = connectMongo(expressSession);
mongoose.connect(config.app.db, { useNewUrlParser: true });
const db = mongoose.connection;

// CORS Settings
const whitelist = [config.client.uri, 'https://github.com'];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

/* Use plugins */
app.use(cors(corsOptions));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: config.secret.session,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db }),
}));
app.use(passport.initialize());
app.use(passport.session());

// API
const v1 = express.Router();
v1.use('/signin', Routers.Singin);
v1.use('/signup', Routers.Singup);
v1.use('/lists', Routers.Lists);
v1.use('/user', Routers.User);

const api = express.Router();
api.use('/v1', v1);

app.use('/api/', api);

// Errors
app.use(Routers.Error);

// Start
app.listen(config.app.port);
