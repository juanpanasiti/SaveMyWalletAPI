import { ObjectId } from 'mongoose';

export interface InstallmentModel {
    _id?: ObjectId;
    feeNumber: number;
    feeAmount: number;
    isConfirmed: boolean;
    paymentCycle: string;
}
