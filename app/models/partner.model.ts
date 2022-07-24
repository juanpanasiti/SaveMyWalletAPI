import { Schema, SchemaTypes, model } from 'mongoose';
import { PartnerModel } from '../interfaces/partner.interfaces';

export const PartnerSchema = new Schema<PartnerModel>({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    canEdit: {
        type: SchemaTypes.Boolean,
        default: false,
    },
});

export default model('Partner', PartnerSchema);
