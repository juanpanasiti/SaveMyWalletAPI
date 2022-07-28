import { model, Schema, SchemaTypes } from 'mongoose';
import { CreditCardModel } from '../interfaces/credit-card.interfaces';
import { PartnerSchema } from './partner.model';
import { PaymentCycleSchema } from './payment-cycle.model';
import { PurchaseSchema } from './purchase.model';

const CreditCardSchema = new Schema<CreditCardModel>({
    name: {},
    paymentCycles: {
        type: [PaymentCycleSchema],
        default: [],
    },
    balance: {
        type: SchemaTypes.Number,
        default: 0,
        get: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        set: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        min: 0,
    },
    cycleAmountAlert: {
        type: SchemaTypes.Number,
        default: 0,
        get: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        set: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        min: 0,
    },
    purchases: {
        type: [PurchaseSchema],
        default: [],
    },
    isDeleted: {
        type: SchemaTypes.Boolean,
        default: false,
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    partners: {
        type: [PartnerSchema],
        default: [],
    },
    nextClosingDate: {
        type: SchemaTypes.Date,
        required: false,
        default: null,
    },
    nextExpirationDate: {
        type: SchemaTypes.Date,
        required: false,
        default: null,
    },
});

export default model('CreditCard', CreditCardSchema);
