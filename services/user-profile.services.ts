import UserProfile from '../models/user-profile.model';
import { EditableUserProfile, UserProfileModel } from '../interfaces/user-profile.interfaces';
import Logger from '../helpers/logger';
import user from '../models/user';

export const updateProfileById = async (uid: string, payload: EditableUserProfile): Promise<UserProfileModel | null> => {
    try {
        const edit = await UserProfile.findByIdAndUpdate(uid, payload, { new: true })
        const profile = await UserProfile.find();
        Logger.info(profile)
        return edit;
    } catch (err) {
        Logger.error(
            'Error on .../services/user-profile.services.ts -> updateProfileById()',
            `${err}`
        );
        throw new Error(`${err}`);
    }
};
