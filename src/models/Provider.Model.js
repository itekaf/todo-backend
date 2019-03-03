import { Schema, model } from 'mongoose';

const ProviderSchema = new Schema({
    id: String,
    token: String,
});

const ProviderModel = model('Provider', ProviderSchema);

export { ProviderSchema };
export default ProviderModel;
