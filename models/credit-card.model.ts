import { model, Schema, SchemaTypes } from 'mongoose';
import { CreditCardModel } from '../interfaces/credit-card.interfaces';
import { PartnerSchema } from './partner.model';
import { PaymentCycleSchema } from './payment-cycle.model';
import { PurchaseSchema } from './purchase.model';

const CreditCardSchema = new Schema<CreditCardModel>({
    name: {
        
    },
    PaymentCycles: {
        type: [PaymentCycleSchema],
        default: [],
    },
    balance: {
        type: SchemaTypes.Number,
        required: true,
        get: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        set: (value: number) => Math.round((value + Number.EPSILON) * 100) / 100,
        min: 0,
    },
    cycleAmountAlert: {
        type: SchemaTypes.Number,
        required: true,
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
});

export default model('CreditCard', CreditCardSchema);
