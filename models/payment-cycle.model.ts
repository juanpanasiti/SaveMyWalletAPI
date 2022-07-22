import { model, Schema, SchemaTypes } from 'mongoose';
import { PaymentCycleModel } from '../interfaces/payment-cycle.interfaces';

export const PaymentCycleSchema = new Schema<PaymentCycleModel>({
    isDeleted: {
        type: SchemaTypes.Boolean,
        default: false,
    },
    month: {
        type: SchemaTypes.Number,
        required: true,
        min: 1,
        max: 12,
        get: (value: number) => Math.round(value),
        set: (value: number) => Math.round(value),
    },
    year: {
        type: SchemaTypes.Number,
        required: true,
        min: 2000,
        get: (value: number) => Math.round(value),
        set: (value: number) => Math.round(value),
    },
    installments: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Installment',
        },
    ],
    closingDate: {
        type: SchemaTypes.Date,
        required: true,
    },
    expirationDate: {
        type: SchemaTypes.Date,
        required: true,
    },
    status: {
        type: SchemaTypes.String,
        lowercase: true,
        enum: ['open', 'closed', 'paid'],
    },
    amount: {
        type: SchemaTypes.Number,
        required: true,
        get: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        set: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        min: 0,
    },
});

export default model('PaymentCycle', PaymentCycleSchema);
