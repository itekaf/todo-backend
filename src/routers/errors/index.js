import express from 'express';

import MethodRouter from './method';

const router = express.Router();
router.use('*', MethodRouter);

export { MethodRouter as MethodErrorRouter };
export default router;
