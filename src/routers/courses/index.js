import express from 'express';

import { auth } from '../../utils';
import CoursesGetRouter from './courses.get';
import CoursesPutRouter from './courses.put';
import CoursesPostRouter from './courses.post';
import CoursesDeleteRouter from './courses.delete';

const router = express.Router({ mergeParams: true });
router.use('*', auth.check);
router.get('*', CoursesGetRouter);
router.put('*', CoursesPutRouter);
router.post('*', CoursesPostRouter);
router.delete('*', CoursesDeleteRouter);

export default router;
