import { Schema, model, SchemaTypes } from 'mongoose';
import { PurchaseModel } from '../interfaces/purchase.interfaces';
import { InstallmentSchema } from './installment.model';

export const PurchaseSchema = new Schema<PurchaseModel>({
    itemNameCC: {
        type: SchemaTypes.String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    descriptiveName: {
        type: SchemaTypes.String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    detail: {
        type: SchemaTypes.String,
        required: false,
        trim: true,
        default: '',
    },
    date: {
        type: SchemaTypes.Date,
        max: new Date(),
    },
    installmentCount: {
        type: SchemaTypes.Number,
        required: true,
        get: (value: number) => Math.round(value),
        set: (value: number) => Math.round(value),
        min: 1,
    },
    amount: {
        type: SchemaTypes.Number,
        required: true,
        get: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        set: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        min: 0,
    },
    installments: {
        type: [InstallmentSchema],
        default: [],
    },
    isDeleted: {
        type: SchemaTypes.Boolean,
        default: false,
    },
    finished: {
        type: SchemaTypes.Boolean,
        default: false,
    },
});

export default model('Purchase', PurchaseSchema);
