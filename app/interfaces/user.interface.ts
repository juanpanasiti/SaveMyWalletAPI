import { FilterQuery, ObjectId, ProjectionType, QueryOptions } from 'mongoose';
import { Roles, Status } from '../constants/enums';
import { UserProfileModel, EditableUserProfile } from './user-profile.interfaces';

export interface UserModel {
    _id?: ObjectId;
    email: string;
    username: string;
    password: string;
    img: string | null;
    role: Roles;
    status: Status;
    google: boolean;
    profile: UserProfileModel;
    creditCards: any;
}

export interface EditableUserData {
    email?: string;
    username?: string;
    password?: string;
    img?: string | null;
    role?: Roles;
    status?: Status;
    profile?: EditableUserProfile;
}
