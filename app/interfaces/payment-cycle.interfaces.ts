import { ObjectId } from 'mongoose';
import { InstallmentModel } from './installment.interfaces';

export interface PaymentCycleModel {
    _id?: ObjectId;
    isDeleted: boolean;
    month: number;
    year: number;
    installments: InstallmentModel[];
    closingDate: Date;
    expirationDate: Date;
    status: 'open' | 'closed' | 'paid';
    amount: number;
}
