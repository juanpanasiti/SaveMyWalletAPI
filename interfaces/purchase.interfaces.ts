import { ObjectId } from 'mongoose';
import { InstallmentModel } from './installment.interfaces';

export interface PurchaseModel {
    _id?: ObjectId;
    itemNameCC: string;
    descriptiveName: string;
    detail: string;
    date: Date;
    installmentCount: number;
    amount: number;
    installments: InstallmentModel[];
    isDeleted: boolean;
    finished: boolean;
}
