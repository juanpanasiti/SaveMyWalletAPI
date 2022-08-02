import { NewPurchaseBody, PurchaseModel } from '../interfaces/purchase.interfaces';
import Purchase from '../models/purchase.model';
import { PurchaseDocument } from '../types/purchase.tytpes';

export const newPurchase = (purchaseForm: NewPurchaseBody): PurchaseDocument => {
    try {
        return new Purchase(purchaseForm);
    } catch (err) {
        throw new Error(`${err}`);
    }
};
