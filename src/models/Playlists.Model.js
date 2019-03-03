import { Schema, model } from 'mongoose';
import mongooseRelationship from 'mongoose-relationship';

const PlaylistSchema = new Schema({
    name: { type: String, required: true },
    deleteAt: Date,
    description: { type: String, default: '' },

    users: [{ type: Schema.Types.ObjectId, ref: 'Users', childPath: 'playlists' }],
    courses: [{ type: Schema.Types.ObjectId, ref: 'Courses' }],
});

PlaylistSchema.plugin(mongooseRelationship, { relationshipPathName: 'users' });
const PlaylistModel = model('Playlists', PlaylistSchema);

export { PlaylistSchema };
export default PlaylistModel;
