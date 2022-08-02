import User from '../models/user';
import UserProfile from '../models/user-profile.model';
import Logger from '../helpers/logger';
import { RegisterBody } from '../interfaces/auth.interfaces';
import { encrypt } from '../helpers/password';
import { EditableUserData, UserModel } from '../interfaces/user.interface';
import { EditableUserProfile } from '../interfaces/user-profile.interfaces';
import * as profileService from './user-profile.services';
import { FilterOptions } from '../interfaces/generic.interfaces';

export const countUsersByFilter = async (filterOptions: FilterOptions<UserModel>) => {
    const { filter = {} } = filterOptions;
    try {
        return await User.countDocuments(filter);
    } catch (err) {
        Logger.error('Error on .../services/user.services.ts -> countUsersByFilter()', `${err}`);
        throw new Error(`${err}`);
    }
};

export const createUser = async (fields: RegisterBody) => {
    try {
        const newUser = new User(fields);
        newUser.profile = new UserProfile();

        // Encrypt password
        newUser.password = encrypt(fields.password);

        // Save
        await newUser.save();

        return newUser;
    } catch (err) {
        Logger.error('Error on .../services/user.services.ts -> createUser()', `${err}`);
        throw new Error(`${err}`);
    }
};

export const getOneUserByFilter = async ({
    filter,
    options = {},
    projection = null,
}: FilterOptions<UserModel>): Promise<UserModel | null> => {
    try {
        return await User.findOne(filter, projection, options); //.populate('creditCards');
    } catch (err) {
        Logger.error('Error on .../services/user.services.ts -> getOneUserByFilter()', `${err}`);
        throw new Error(`${err}`);
    }
};

export const getManyUsersByFilter = async (filterOptions: FilterOptions<UserModel>): Promise<UserModel[]> => {
    const { filter = {}, options = {}, projection = null } = filterOptions;
    try {
        return await User.find(filter, projection, options);
    } catch (err) {
        Logger.error('Error on .../services/user.services.ts -> getManyUsersByFilter()', `${err}`);
        throw new Error(`${err}`);
    }
};

export const updateUserById = async (
    uid: string,
    userPayload: EditableUserData,
    profilePayload: EditableUserProfile = {}
): Promise<UserModel | null> => {
    try {
        const user = await User.findByIdAndUpdate(uid, userPayload, { new: true });
        if (user && profilePayload) {
            await profileService.updateProfile(user, profilePayload);
        }

        return user;
    } catch (err) {
        Logger.error('Error on .../services/user.services.ts -> updateUserById()', `${err}`);
        throw new Error(`${err}`);
    }
};
