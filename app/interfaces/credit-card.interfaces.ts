import { Document, ObjectId } from 'mongoose';
import { PartnerModel } from './partner.interfaces';
import { PaymentCycleModel } from './payment-cycle.interfaces';
import { PurchaseModel, UpdatePurchaseBody } from './purchase.interfaces';
import { UserModel } from './user.interface';

export interface ICreditCardModel extends Document {
    _id?: ObjectId;
    name: string;
    paymentCycles: PaymentCycleModel[];
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

export interface EditCreditCardBody {
    name?: string;
    cycleAmountAlert?: number;
    nextClosingDate?: Date;
    nextExpirationDate?: Date;
}

export interface CCReqQuery {
    partners: boolean;
    purchases: boolean;
    cycles: boolean;
}
