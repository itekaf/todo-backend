import express from 'express';

import CourseModel from '../../models/Course.Model';
import { answer } from '../../utils';

const resultHandler = (req, res) => {
    const data = { deleteAt: new Date() };
    const query = {
        _id: req.params.courseId,
        playlist: req.params.playlistId,
    };
    CourseModel
        .updateOne(query, data)
        .then(() => answer.data(200, req.params.courseId, 'OK').send(res))
        .catch(updateErr => answer.error(401, 'Something wrong', updateErr).send(res));
};

const router = express.Router({ mergeParams: true });
router.delete('/:courseId', resultHandler);
export default router;
