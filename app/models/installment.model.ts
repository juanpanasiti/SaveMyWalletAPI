import { Schema, model, SchemaTypes } from 'mongoose';
import { InstallmentModel } from '../interfaces/installment.interfaces';

export const InstallmentSchema = new Schema<InstallmentModel>({
    feeNumber: {
        type: SchemaTypes.Number,
        required: true,
        get: (value: number) => Math.round(value),
        set: (value: number) => Math.round(value),
        min: 0,
        default: 0,
    },
    feeAmount: {
        type: SchemaTypes.Number,
        required: true,
        get: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        set: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        min: 0,
    },
    isConfirmed: {
        type: SchemaTypes.Boolean,
        default: false,
    },
    paymentCycle: {
        type: SchemaTypes.String,
        required: true,
        trim: true,
        match: [/[0-9]{4}-(0[1-9]|1[0-2])/, ''], // yyyy-mm
    },
});

export default model('Installment', InstallmentSchema);
