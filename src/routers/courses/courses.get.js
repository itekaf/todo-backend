import express from 'express';

import CourseModel from '../../models/Course.Model';
import { answer } from '../../utils';

const resultArrayHandler = (req, res) => {
    const { query, count, from } = req.query;

    const itemsFrom = from * 1 || 0;
    const itemsCount = count * 1 || 10;

    const itemsCriteria = {
        playlist: req.params.playlistId,
    };

    // TODO: RL: Text index search doesn't work
    if (query && query !== 'undefined' && query !== 'null') {
        itemsCriteria.name = { $regex: new RegExp(query), $options: 'gim' };
    }

    CourseModel
        .where('deleteAt').exists(false)
        .find(itemsCriteria)
        .skip(itemsFrom)
        .limit(itemsCount)
        .exec()
        .then((result) => {
            const courses = result.map(course => ({
                id: course.id,
                name: course.name,
                date: course.date,
                length: course.length,
                isTopRated: course.isTopRated,
                description: course.description,
                playlistId: course.playlist,
            }));
            answer.data(200, courses, 'OK').send(res);
        })
        .catch(findError => answer.error(401, 'Courses not found', findError).send(res));
};

const resultOneHandler = (req, res) => {
    CourseModel
        .where('deleteAt').exists(false)
        // TODO: RL: Find One
        .find({ _id: req.params.courseId, playlist: req.params.playlistId })
        .then((result) => {
            const courses = result.map(course => ({
                id: course.id,
                name: course.name,
                date: course.date,
                length: course.length,
                isTopRated: course.isTopRated,
                description: course.description,
                playlistId: course.playlist,
            }));
            answer.data(200, courses[0], 'OK').send(res);
        })
        .catch(findError => answer.error(401, 'Course not found', findError).send(res));
};


const router = express.Router({ mergeParams: true });
router.get('/', resultArrayHandler);
router.get('/:courseId', resultOneHandler);
export default router;
