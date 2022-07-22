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

export interface UsersFilterOptions {
    filter: FilterQuery<UserModel> | undefined;
    projection?: ProjectionType<UserModel> | null | undefined;
    options?: QueryOptions<UserModel> | null | undefined;
}
