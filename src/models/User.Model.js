import { Schema, model } from 'mongoose';
import { ProviderSchema } from './Provider.Model';

const UserSchema = new Schema({
    name: String,
    email: String,
    avatar: String,
    deleteAt: Date,
    password: String,
    username: { type: String, required: true, unique: true },

    providers: {
        type: Map,
        of: ProviderSchema,
    },
    lists: [{ type: Schema.Types.ObjectId, ref: 'Lists' }],
});

const UserModel = model('Users', UserSchema);

export { UserSchema };
export default UserModel;
