import express from 'express';

import PlaylistModel from '../../models/Playlists.Model';
import { answer } from '../../utils';

const resultArrayHandler = (req, res) => {
    PlaylistModel
        .where('deleteAt').exists(false)
        .find({ users: req.user.id })
        .exec()
        .then((result) => {
            const items = result.reduce((acum, list) => {
                const item = {
                    id: list._id,
                    name: list.name,
                    description: list.description,
                    users: list.users,
                    courses: list.courses,
                };
                acum.push(item);
                return acum;
            }, []);
            answer.data(200, items, 'OK').send(res);
        })
        .catch(findError => answer.error(401, 'Playlist not found', findError).send(res));
};

const resultOneHandler = (req, res) => {
    PlaylistModel
        .where('deleteAt').exists(false)
        .find({ _id: req.params.playlistId, users: req.user.id })
        .then((result) => {
            if (!result.length) { throw new Error(); }
            const items = result.reduce((acum, list) => {
                const item = {
                    id: list._id,
                    name: list.name,
                    description: list.description,
                    users: list.users,
                    courses: list.courses,
                };
                acum.push(item);
                return acum;
            }, []);
            answer.data(200, items, 'OK').send(res);
        })
        .catch(findError => answer.error(401, 'Playlist not found', findError).send(res));
};

const router = express.Router();
router.get('/', resultArrayHandler);
router.get('/:playlistId', resultOneHandler);

export default router;
