import { Schema, SchemaTypes, model } from 'mongoose';
import { UserProfileModel } from '../interfaces/user-profile.interfaces';

export const UserProfileSchema = new Schema<UserProfileModel>({
    nextPaymentDate: {
        type: SchemaTypes.Date,
        default: new Date(),
    },
    paymentAmount: {
        type: SchemaTypes.Number,
        default: null,
        get: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        set: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        min: 0,
    },
    asociatedCreditCards: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Installment',
        },
    ],
    globalCycleAmountAlert: {
        type: SchemaTypes.Number,
        min: 0,
        default: 0,
        get: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        set: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
    },
    activeGlobalCycleAmountAlert: {
        type: SchemaTypes.Boolean,
        default: false
    }
});

export default model('UserProfile', UserProfileSchema)