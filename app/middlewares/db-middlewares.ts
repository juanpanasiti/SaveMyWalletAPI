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
    const cc_id = req.params.id;
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
                        value: cc_id,
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
