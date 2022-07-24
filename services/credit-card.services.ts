import Logger from '../helpers/logger';
import { NewCreditCardBody, CreditCardModel } from '../interfaces/credit-card.interfaces';
import CreditCard from '../models/credit-card.model';
import { FilterOptions } from '../interfaces/generic.interfaces';

export const getManyCreditCardsByFilter = async (
    filterOptions: FilterOptions<CreditCardModel>
): Promise<CreditCardModel[]> => {
    const { filter = {}, options = {}, projection = null } = filterOptions;
    try {
        return await CreditCard.find(filter, projection, options);
    } catch (err) {
        Logger.error('Error on .../services/user.services.ts -> getManyUsersByFilter()', `${err}`);
        throw new Error(`${err}`);
    }
};

export const createCreditCard = async (payload: NewCreditCardBody, uid: string): Promise<any> => {
    try {
        const newCreditCard = await new CreditCard({
            ...payload,
            owner: uid,
        }).populate('owner')
        if (!newCreditCard) {
            throw new Error('Error creating the new CreditCard');
        }
        return await newCreditCard.save();
    } catch (err) {
        Logger.error(
            'Error on .../services/credit-card.services.ts -> createCreditCard()',
            `${err}`
        );
        throw new Error(`${err}`);
    }
};
