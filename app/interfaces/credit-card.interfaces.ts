import { FilterQuery, ObjectId, ProjectionType, QueryOptions } from 'mongoose';
import { PartnerModel } from './partner.interfaces';
import { PaymentCycleModel } from './payment-cycle.interfaces';
import { PurchaseModel } from './purchase.interfaces';
import { UserModel } from './user.interface';

export interface CreditCardModel {
    _id?: ObjectId;
    name: string;
    PaymentCycles: PaymentCycleModel[];
    balance: number;
    cycleAmountAlert: number;
    purchases: PurchaseModel[];
    isDeleted: boolean;
    owner: UserModel;
    partners: PartnerModel[];
    nextClosingDate: Date;
    nextExpirationDate: Date;
}

export interface NewCreditCardBody {
    name: string;
    cycleAmountAlert?: number;
    nextClosingDate: Date;
    nextExpirationDate: Date;
}
