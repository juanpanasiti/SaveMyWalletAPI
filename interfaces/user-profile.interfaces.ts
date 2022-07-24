import { ObjectId } from 'mongoose';

export interface UserProfileModel {
    _id?: ObjectId;
    nextPaymentDate: Date;
    paymentAmount: number;
    globalCycleAmountAlert: number;
    activeGlobalCycleAmountAlert: boolean;
}

export interface EditableUserProfile {
    nextPaymentDate?: Date;
    paymentAmount?: number;
    globalCycleAmountAlert?: number;
    activeGlobalCycleAmountAlert?: boolean;
}