import Logger from '../helpers/logger';
import { NewCreditCardBody } from '../interfaces/credit-card.interfaces';
import CreditCard from '../models/credit-card.model';
import {
    CCFilterOptions,
    CCListPromise,
    NewCCPromise,
    OneCCPromise,
} from '../types/credit-card.types';

export const countCreditCardsByFilter = async (filterOptions: CCFilterOptions): Promise<number> => {
    const { filter = {}, options = {} } = filterOptions;
    try {
        // const test = await CreditCard.aggregate([
        //     {
        //         $project:{
        //             items: {
        //                 $filter: {
        //                     input: '$partners',
        //                     as: 'partner',
        //                     cond: {
        //                         '$and': [

        //                         ]
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // ])
        // Logger.warning(test)
        return await CreditCard.countDocuments(filter, options);
    } catch (err) {
        Logger.error(
            'Error on .../services/credit-cards.services.ts -> countCreditCardsByFilter()',
            `${err}`
        );
        throw new Error(`${err}`);
    }
};

export const getOneCreditCardsByFilter = async (filterOptions: CCFilterOptions): OneCCPromise => {
    const { filter = {}, options = {}, projection = null } = filterOptions;
    try {
        return await await CreditCard.findOne(filter, projection, options);
    } catch (err) {
        Logger.error(
            'Error on .../services/user.services.ts -> getOneCreditCardsByFilter()',
            `${err}`
        );
        throw new Error(`${err}`);
    }
};

export const getManyCreditCardsByFilter = async (filterOptions: CCFilterOptions): CCListPromise => {
    const { filter = {}, options = {}, projection = null } = filterOptions;
    try {
        return await CreditCard.find(filter, projection, options);
    } catch (err) {
        Logger.error('Error on .../services/user.services.ts -> getManyUsersByFilter()', `${err}`);
        throw new Error(`${err}`);
    }
};

export const createCreditCard = async (payload: NewCreditCardBody, uid: string): NewCCPromise => {
    try {
        const newCreditCard = await new CreditCard({
            ...payload,
            owner: uid,
        }).populate('owner');
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
