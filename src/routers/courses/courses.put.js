import express from 'express';

import CourseModel from '../../models/Course.Model';
import { validate, answer } from '../../utils';

const validateRules = [
    validate.rules.uuid(),
    validate.rules.name(),
    validate.rules.provider(),
];

const resultHandler = (req, res) => {
    const itemData = {
        id: req.params.courseId,
        name: req.body.name,
        date: req.body.date,
        length: req.body.length,
        isTopRated: !!req.body.isTopRated,
        playlist: req.body.playlist,
        description: req.body.description,
    };
    const itemQuery = {
        _id: req.params.courseId,
        playlist: req.params.playlistId,
    };
    CourseModel
        .where('deleteAt').exists(false)
        .updateOne(itemQuery, itemData)
        .then(() => answer.data(200, itemData, 'OK').send(res))
        .catch(errSave => answer.error(401, 'Something wrong', errSave).send(res));
};

const router = express.Router({ mergeParams: true });
router.put('/:courseId',
    validateRules,
    validate.result,
    resultHandler);

export default router;
