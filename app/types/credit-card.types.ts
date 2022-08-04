import { Document, FilterQuery, Types } from 'mongoose';
import { ICreditCardModel } from '../interfaces/credit-card.interfaces';
import { FilterOptions } from '../interfaces/generic.interfaces';

// For mongoose
export type CreditCardDB = Document<unknown, any, ICreditCardModel> &
    ICreditCardModel & {
        _id: Types.ObjectId;
    };
export type OneCreditCardDB = CreditCardDB | null;
export type CCFilterOptions = FilterOptions<ICreditCardModel>;
export type CCQueryOptions = FilterQuery<ICreditCardModel>;

// Promises
export type CCListPromise = Promise<ICreditCardModel[]>;
export type OneCCPromise = Promise<OneCreditCardDB>;
export type NewCCPromise = Promise<CreditCardDB>;
