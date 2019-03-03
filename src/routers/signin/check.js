import express from 'express';

import { answer, auth } from '../../utils';

const resultHandler = (req, res) => {
    const token = auth.generateToken(req.user);
    const answerModel = answer.token(201, token, req.isAuthenticated());
    answerModel.send(res);
};

const router = express.Router();
router.get('/', resultHandler);

export default router;
