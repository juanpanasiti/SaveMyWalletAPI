import { ObjectId } from 'mongoose';

export interface InstallmentModel {
    _id?: ObjectId;
    isDeleted: boolean;
    feeNumber: number;
    feeAmount: number;
    isConfirmed: boolean;
    paymentCycle: string;
}
