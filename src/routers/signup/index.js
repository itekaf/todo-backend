import express from 'express';

import localRouter from './local';

const router = express.Router();
router.use('/local', localRouter);

export default router;
