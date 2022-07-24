import { Schema, SchemaTypes, model } from 'mongoose';
import { UserProfileModel } from '../interfaces/user-profile.interfaces';
import Logger from '../helpers/logger';

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

UserProfileSchema.virtual('creditCards')
    .get(() => {
        Logger.info('Getter called')
        return ['sarasa']
    })

export default model('UserProfile', UserProfileSchema)