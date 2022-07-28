import { Document, Types } from 'mongoose';
import { CreditCardModel } from '../interfaces/credit-card.interfaces';
import { FilterOptions } from '../interfaces/generic.interfaces';

// For mongoose
export type CreditCardDB = Document<unknown, any, CreditCardModel> &
    CreditCardModel & {
        _id: Types.ObjectId;
    };
export type OneCreditCardDB = CreditCardDB | null;
export type CCFilterOptions = FilterOptions<CreditCardModel>;

// Promises
export type CCListPromise = Promise<CreditCardModel[]>;
export type OneCCPromise = Promise<OneCreditCardDB>;
export type NewCCPromise = Promise<CreditCardDB>;
