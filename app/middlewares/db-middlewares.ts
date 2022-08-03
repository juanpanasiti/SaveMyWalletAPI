import { NextFunction, Response, Request } from 'express';
import { JsonResponse } from '../interfaces/response.interfaces';
import Logger from '../helpers/logger';
import * as creditCardServices from '../services/credit-card.services';
import { CCFilterOptions, CCQueryOptions } from '../types/credit-card.types';

type CCExistsOptions = {
    needEditAccess?: boolean;
    userMustBeOwner?: boolean;
};
const defaultOptions: CCExistsOptions = {
    needEditAccess: false,
    userMustBeOwner: false,
};

export const creditCardExists = (options: CCExistsOptions = defaultOptions) => {
    /**
     * This function checks that the credit card exists and the user logged is the owner or a partner.
     * ! Refactor when be possible
     */
    const { needEditAccess, userMustBeOwner } = options;
    return async (req: Request, res: Response<JsonResponse>, next: NextFunction) => {
        const uid = req.headers.authId;
        const ccId = req.params.id;
        // const queryPartner: CCQueryOptions = { 'partner.user': uid , 'partner.canEdit': true };
        const queryPartner: CCQueryOptions = userMustBeOwner ? {} : { 'partners.user': uid };
        const filterOptions: CCFilterOptions = {
            filter: {
                $and: [{ _id: ccId, isDeleted: false }, { $or: [{ owner: uid }, queryPartner] }],
            },
            options: {
                limit: 1,
            },
            projection: 'partners.user partners.canEdit owner',
        };
        try {
            let count: number;
            if (!needEditAccess || userMustBeOwner) {
                count = await creditCardServices.countCreditCardsByFilter(filterOptions);
            } else {
                const docs = await creditCardServices.getOneCreditCardsByFilter(filterOptions);
                if (docs?.owner.toString() === uid) {
                    count = 1;
                } else {
                    const canEdit = docs?.partners.filter((partner) => {
                        return partner.user.toString() === uid && partner.canEdit === true;
                    });
                    count = canEdit?.length || 0;
                }
            }

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
            Logger.error(err);
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
};

export const userMustBeOwnerCC = async (req: Request, res: Response<JsonResponse>, next: NextFunction) => {
    const uid = req.headers.authId;
    const ccId = req.params.id;
    const filterOptions: CCFilterOptions = {
        filter: { _id: ccId, isDeleted: false },
        projection: 'owner',
    };
    try {
        const creditCard = await creditCardServices.getOneCreditCardsByFilter(filterOptions);
        if (creditCard?.owner.toString() !== uid) {
            return res.status(401).json({
                response_data: null,
                errors: [
                    {
                        msg: 'Just the owner can use do this action',
                    },
                ],
            });
        }
    } catch (err) {
        Logger.error(err);
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

export const purchaseExists = async (req: Request, res: Response<JsonResponse>, next: NextFunction) => {
    const ccId = req.params.id;
    const purchaseId = req.params.purchaseId;

    const filterOptions: CCFilterOptions = {
        filter: {
            $and: [{ _id: ccId, isDeleted: false }, { 'purchases._id': purchaseId }],
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
                        msg: 'Purchase not found!',
                        location: 'params',
                        param: 'id',
                        value: purchaseId,
                    },
                ],
            });
        }
    } catch (err) {
        Logger.error(err);
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
