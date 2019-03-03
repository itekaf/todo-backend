import express from 'express';

import PlaylistModel from '../../models/Playlists.Model';
import { answer, validate } from '../../utils';

const validateRules = [
    validate.rules.uuid(),
    validate.rules.name(),
    validate.rules.provider(),
    validate.rules.array('users'),
    validate.rules.exist('users'),
];

const resultHandler = (req, res) => {
    const itemData = {
        name: req.body.name,
        users: req.body.users,
        description: req.body.description,
    };
    PlaylistModel
        .where('deleteAt').exists(false)
        .updateOne({ _id: req.params.playlistId }, itemData)
        .then(() => answer.data(200, itemData, 'OK').send(res))
        .catch(errSave => answer.error(401, 'Something wrong', errSave).send(res));
};

const router = express.Router();
router.put('/:playlistId',
    validateRules,
    validate.result,
    resultHandler);

export default router;
