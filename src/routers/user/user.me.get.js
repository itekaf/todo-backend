import express from 'express';

import { answer, auth } from '../../utils';

const resultHandler = (req, res) => {
    const token = auth.generateToken(req.user);
    answer.token(200, token, 'User saved').send(res);
};

const router = express.Router();
router.get('/', resultHandler);

export default router;
