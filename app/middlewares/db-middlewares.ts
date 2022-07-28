import { NextFunction, Response, Request } from 'express';
import { CreditCardModel } from '../interfaces/credit-card.interfaces';
import { FilterOptions } from '../interfaces/generic.interfaces';
import { JsonResponse } from '../interfaces/response.interfaces';
import Logger from '../helpers/logger';
import * as creditCardServices from '../services/credit-card.services';

export const creditCardExists = async (
    req: Request,
    res: Response<JsonResponse>,
    next: NextFunction
) => {
    const uid = req.headers.authId;
    const ccId = req.params.id;
    const filterOptions: FilterOptions<CreditCardModel> = {
        filter: {
            $and: [
                { _id: req.params.id, isDeleted: false },
                { $or: [{ owner: uid }, { 'partners.user': uid }] },
            ],
        },
        options: {
            limit: 1,
        },
    };
    try {
        const count = await creditCardServices.countCreditCardsByFilter(filterOptions);
        if (count === 0) {
            return res.status(404).json({
                response_data: null,
                errors: [
                    {
                        msg: 'Credit Card not found!',
                        location: 'params',
                        param: 'id',
                        value: ccId,
                    },
                ],
            });
        }
    } catch (err) {
        Logger.error(err)
        return res.status(500).json({
            response_data: null,
            errors: [
                {
                    msg: `${err}`,
                },
            ],
        });
    }
    next();
};

export const userMustBeOwnerCC = async (
    req: Request,
    res: Response<JsonResponse>,
    next: NextFunction
) => {
    const uid = req.headers.authId;
    const ccId = req.params.id;
    const filterOptions: FilterOptions<CreditCardModel> = {
        filter: { _id: ccId, isDeleted: false },
        projection:'owner'
    };
    try {
        const creditCard = await creditCardServices.getOneCreditCardsByFilter(filterOptions);
        if (creditCard?.owner.toString() !== uid) {
            return res.status(401).json({
                response_data: null,
                errors: [
                    {
                        msg: 'Just the owner of the credit card can edit it',
                    },
                ],
            });
        }
    } catch (err) {
        Logger.error(err)
        return res.status(500).json({
            response_data: null,
            errors: [
                {
                    msg: `${err}`,
                },
            ],
        });
    }
    next();
};