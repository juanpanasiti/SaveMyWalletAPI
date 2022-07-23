import { ObjectId } from 'mongoose';
import { CreditCardModel } from './credit-card.interfaces';

export interface UserProfileModel {
    _id?: ObjectId;
    nextPaymentDate: Date;
    paymentAmount: number;
    asociatedCreditCards: CreditCardModel[];
    globalCycleAmountAlert: number;
    activeGlobalCycleAmountAlert: boolean;
}

export interface EditableUserProfile {
    nextPaymentDate?: Date;
    paymentAmount?: number;
    asociatedCreditCards?: CreditCardModel[];
    globalCycleAmountAlert?: number;
    activeGlobalCycleAmountAlert?: boolean;
}