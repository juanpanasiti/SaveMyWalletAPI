import UserProfile from '../models/user-profile.model';
import { EditableUserProfile, UserProfileModel } from '../interfaces/user-profile.interfaces';
import Logger from '../helpers/logger';
import user from '../models/user';
import { UserModel } from '../interfaces/user.interface';
import { Document, Types } from 'mongoose';


export const updateProfile = async (
    user: Document<unknown, any, UserModel> &
        UserModel & {
            _id: Types.ObjectId;
        },
    payload: EditableUserProfile
): Promise<UserModel | null> => {
    try {
        user.profile.nextPaymentDate = payload.nextPaymentDate || user.profile.nextPaymentDate;
        user.profile.paymentAmount = payload.paymentAmount || user.profile.paymentAmount;
        user.profile.activeGlobalCycleAmountAlert = payload.activeGlobalCycleAmountAlert || user.profile.activeGlobalCycleAmountAlert;
        user.profile.globalCycleAmountAlert = payload.globalCycleAmountAlert || user.profile.globalCycleAmountAlert;
        return user
    } catch (err) {
        Logger.error(
            'Error on .../services/user-profile.services.ts -> updateProfileById()',
            `${err}`
        );
        throw new Error(`${err}`);
    }
};
