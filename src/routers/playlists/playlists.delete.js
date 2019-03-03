import express from 'express';

import PlaylistModel from '../../models/Playlists.Model';
import { answer } from '../../utils';

const resultHandler = (req, res) => {
    const itemData = { deleteAt: new Date() };
    PlaylistModel
        .where('deleteAt').exists(false)
        .updateOne({ _id: req.params.playlistId }, itemData)
        .then(result => answer.data(200, result, 'OK').send(res))
        .catch(updateErr => answer.error(401, 'Something wrong', updateErr).send(res));
};

const router = express.Router();
router.delete('/:playlistId', resultHandler);

export default router;
