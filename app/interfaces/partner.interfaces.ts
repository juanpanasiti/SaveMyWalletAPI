import { ObjectId } from 'mongoose';
import { UserModel } from './user.interface';

export interface PartnerModel {
    _id?: ObjectId;
    user: UserModel;
    canEdit: boolean;
}

export interface NewPartnerBody {
    userUsername?: string
    userEmail?: string
    canEdit?: boolean
}
