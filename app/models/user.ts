import { Schema, model, SchemaTypes } from 'mongoose';
import { Roles, Status } from '../constants/enums';
import { UserModel } from '../interfaces/user.interface';
import { UserProfileSchema } from './user-profile.model';
import Logger from '../helpers/logger';
import mongoose from 'mongoose';

const UserSchema = new Schema<UserModel>({
    email: {
        type: String,
        required: [true, 'The email is mandatory.'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'The username is mandatory.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'The email is mandatory.'],
    },
    img: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        required: true,
        default: Roles.USER,
        enum: Object.values(Roles),
    },
    status: {
        type: String,
        default: Status.ACTIVE, // ? Must be 'pending'?
        enum: Object.values(Status),
    },
    google: {
        type: Boolean,
        default: false,
    },
    profile: {
        type: UserProfileSchema,
        required: true,
    },
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

UserSchema.virtual('creditCards', {
    ref: 'CreditCard',
    localField: '_id',
    foreignField: 'owner',
});

UserSchema.set('toJSON', { virtuals: ['creditCards'] });
export default model('User', UserSchema);
