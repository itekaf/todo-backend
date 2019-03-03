import express from 'express';

import { answer } from '../../utils';

const router = express.Router();
router.use('*', (_, res) => answer.error(405, 'Method is not allowed').send(res));

export default router;
