import { Request, Response } from 'express';

import Logger from '../helpers/logger';
import {
    CCReqQuery,
    CreditCardModel,
    NewCreditCardBody,
} from '../interfaces/credit-card.interfaces';
import { PaginationQuery } from '../interfaces/path.interfaces';
import { JsonResponse } from '../interfaces/response.interfaces';
import * as creditCardServices from '../services/credit-card.services';
import { FilterOptions } from '../interfaces/generic.interfaces';
import { PopulateOptions } from 'mongoose';

export const getAllPaginated = async (
    req: Request<{}, {}, {}, PaginationQuery>,
    res: Response<JsonResponse>
) => {
    const { skip = 0, limit = 2 } = req.query;
    const uid = req.headers.authId;
    const filterOptions: FilterOptions<CreditCardModel> = {
        filter: {
            $and: [{ isDeleted: false }, { $or: [{ owner: uid }, { 'partners.user': uid }] }],
        },
        options: {
            skip,
            limit,
        },
    };
    try {
        const ccAsociated = await creditCardServices.getManyCreditCardsByFilter(filterOptions);

        return res.status(200).json({
            response_data: ccAsociated,
            errors: [],
        });
    } catch (err) {
        Logger.error(err);
        res.status(500).json({
            response_data: null,
            errors: [
                {
                    msg: `${err}`,
                },
            ],
        });
    }

    res.status(501).json({
        response_data: null,
        errors: [
            {
                msg: 'Not implemented yet',
            },
        ],
    });
};

export const createCreditCard = async (
    req: Request<{}, {}, NewCreditCardBody>,
    res: Response<JsonResponse>
) => {
    // At this point, we can be sure that body has just the correct
    // fields because of the middlewares
    const { body: payload } = req;
    const uid: string = req.headers.authId as string; // Same here, because of 'validateJWT'

    try {
        const creditCard = await creditCardServices.createCreditCard(payload, uid);
        if (!creditCard) {
            throw new Error('Something went wrong creating the new Credit Card');
        }
        res.status(201).json({
            response_data: creditCard,
            errors: [],
        });
    } catch (err) {
        res.status(500).json({
            response_data: null,
            errors: [
                {
                    msg: `Error -> ${err}`,
                },
            ],
        });
    }
};

export const getOneCreditCardById = async (
    req: Request<{ id: string }, {}, null, CCReqQuery>,
    res: Response<JsonResponse>
) => {
    const { partners, purchases, cycles } = req.query;
    const { id } = req.params;
    const uid = req.headers.authId;
    const populateOptions: PopulateOptions[] = [
        {
            path: 'owner',
            select: 'username img',
        },
    ];

    if (partners) {
        populateOptions.push({
            path: 'partners.user',
            select: 'username img',
        });
    }
    if (purchases) {
        populateOptions.push({
            path: 'purchases',
        });
    }
    if (cycles) {
        populateOptions.push({
            path: 'paymentCycles',
        });
    }

    const filterOptions: FilterOptions<CreditCardModel> = {
        filter: {
            $and: [
                { _id: id, isDeleted: false },
                { $or: [{ owner: uid }, { 'partners.user': uid }] },
            ],
        },
        options: {
            populate: [...populateOptions],
        },
    };

    try {
        const creditCard = await creditCardServices.getOneCreditCardsByFilter(filterOptions);

        if (!creditCard) {
            return res.status(404).json({
                response_data: null,
                errors: [
                    {
                        msg: 'Credit Card not found',
                    },
                ],
            });
        }

        return res.status(200).json({
            response_data: creditCard,
            errors: [],
        });
    } catch (err) {}
};

// ! DELETE - Temporal response
export const notImplemented = async (req: Request, res: Response<JsonResponse>) => {
    res.status(501).json({
        response_data: null,
        errors: [
            {
                msg: 'Not implemented yet',
            },
        ],
    });
};
