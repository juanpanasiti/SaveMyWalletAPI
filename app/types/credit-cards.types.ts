import { Document, Types } from 'mongoose';
import { CreditCardModel } from '../interfaces/credit-card.interfaces';

export type OneCreditCardDB =
    | (Document<unknown, any, CreditCardModel> &
          CreditCardModel & {
              _id: Types.ObjectId;
          })
    | null;
