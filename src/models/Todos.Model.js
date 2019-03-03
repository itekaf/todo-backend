import { Schema, model } from 'mongoose';
import mongooseRelationship from 'mongoose-relationship';

const TodoSchema = new Schema({
    name: { type: String, required: true },
    done: { type: Boolean, default: false },
    dateTo: Date,
    deleteAt: Date,
    description: { type: String, default: '' },

    list: { type: Schema.Types.ObjectId, ref: 'Lists', childPath: 'todos' },
});

TodoSchema.plugin(mongooseRelationship, { relationshipPathName: 'list' });
const TodoModel = model('Todos', TodoSchema);

export { TodoSchema };
export default TodoModel;
