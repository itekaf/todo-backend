import { Schema, model } from 'mongoose';
import mongooseRelationship from 'mongoose-relationship';

const CourseSchema = new Schema({
    name: { type: String, required: true },
    length: { type: Number, required: true },
    isTopRated: { type: Boolean, default: false },
    description: { type: String, required: false, default: '' },
    date: Date,
    deleteAt: Date,
    playlist: { type: Schema.Types.ObjectId, ref: 'Playlists', childPath: 'courses' },
});

CourseSchema.plugin(mongooseRelationship, { relationshipPathName: 'playlist' });
const CourseModel = model('Courses', CourseSchema);

export { CourseSchema };
export default CourseModel;
