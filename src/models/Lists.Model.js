import { Schema, model } from 'mongoose';
import mongooseRelationship from 'mongoose-relationship';

const ListSchema = new Schema({
    name: { type: String, required: true },
    deleteAt: Date,
    description: { type: String, default: '' },

    users: [{ type: Schema.Types.ObjectId, ref: 'Users', childPath: 'lists' }],
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todos' }],
});

ListSchema.plugin(mongooseRelationship, { relationshipPathName: 'users' });
const ListModel = model('Lists', ListSchema);

export { ListSchema };
export default ListModel;
