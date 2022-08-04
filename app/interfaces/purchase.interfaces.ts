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

export interface NewPurchaseBody {
    itemNameCC?: string;
    descriptiveName?: string;
    detail?: string;
    date?: Date;
    installmentCount?: number;
    amount?: number;
}

export interface UpdatePurchaseBody {
    itemNameCC?: string;
    descriptiveName?: string;
    detail?: string;
}
