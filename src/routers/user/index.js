import express from 'express';

import { auth } from '../../utils';
import UserMeGetRouter from './user.me.get';
import UserMePutRouter from './user.me.put';
import UserPasswordRouter from './user.password';

const meRouter = express.Router();
meRouter.get('*', UserMeGetRouter);
meRouter.put('*', UserMePutRouter);

const userRouter = express.Router();
userRouter.use('*', auth.check);
userRouter.use('/me', meRouter);
userRouter.use('/password', UserPasswordRouter);

export default userRouter;
