import express from 'express';

import { auth } from '../../utils';

import CoursesRouter from '../courses';
import PlaylistsGetRouter from './playlists.get';
import PlaylistsPutRouter from './playlists.put';
import PlaylistsPostRouter from './playlists.post';
import PlaylistsDeleteRouter from './playlists.delete';

const router = express.Router();
router.use('*', auth.check);
router.get('*', PlaylistsGetRouter);
router.put('*', PlaylistsPutRouter);
router.post('*', PlaylistsPostRouter);
router.delete('*', PlaylistsDeleteRouter);
router.use('/:playlistId/courses', CoursesRouter);

export default router;
