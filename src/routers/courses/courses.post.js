import express from 'express';

import CoursesService from '../../service/Courses.Service';

import { validate, answer } from '../../utils';

const validateRules = [
    validate.rules.uuid(),
    validate.rules.name(),
    validate.rules.provider(),
];

const resultHandler = (req, res) => {
    const itemData = {
        name: req.body.name,
        length: req.body.length,
        isTopRated: req.body.isTopRated,
        date: req.body.date || null,
        playlist: req.params.playlistId,
        description: req.body.description || null,
    };
    const itemInstanse = new CoursesService(itemData);
    itemInstanse
        .create()
        .then((result) => {
            const data = {
                id: result.id,
                name: result.name,
                length: result.length,
                isTopRated: result.isTopRated,
                description: result.description,
                date: result.date,
                playlist: result.playlist,
            };
            return answer.data(200, data, 'OK').send(res);
        })
        .catch(saveError => answer.error(401, 'Something wrong', saveError));
};

const router = express.Router({ mergeParams: true });
router.post('/',
    validateRules,
    validate.result,
    resultHandler);

export default router;
