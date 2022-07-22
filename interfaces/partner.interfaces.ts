import { ObjectId } from 'mongoose';
import { UserModel } from './user.interface';

export interface PartnerModel {
    _id?: ObjectId;
    user: UserModel;
    canEdit: boolean;
}
