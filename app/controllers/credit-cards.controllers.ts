import { Request } from 'express';
import { PopulateOptions } from 'mongoose';

import Logger from '../helpers/logger';
import * as creditCardServices from '../services/credit-card.services';
import * as userServices from '../services/user.services';
import { CCFilterOptions } from '../types/credit-card.types';
import {
    PutCCRequest,
    GetOneCCRequest,
    JsonResponse,
    PostCCRequest,
    PaginatedRequest,
    PostPartnerRequest,
} from '../types/request-response.types';
import { UserFilterOptions } from '../types/user.types';
import Partner from '../models/partner.model';
import { DeletePartnerRequest } from '../types/request-response.types';

export const getAllPaginated = async (req: PaginatedRequest, res: JsonResponse) => {
    const { skip = 0, limit = 2 } = req.query;
    const uid = req.headers.authId;
    const filterOptions: CCFilterOptions = {
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

export const createCreditCard = async (req: PostCCRequest, res: JsonResponse) => {
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

export const getOneCreditCardById = async (req: GetOneCCRequest, res: JsonResponse) => {
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

    const filterOptions: CCFilterOptions = {
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

export const editOneCreditCardById = async (req: PutCCRequest, res: JsonResponse) => {
    const { id } = req.params;
    const { name, cycleAmountAlert, nextClosingDate, nextExpirationDate } = req.body;
    const uid = req.headers.authId;

    const filterOptions: CCFilterOptions = {
        filter: { _id: id, isDeleted: false },
        projection: 'name cycleAmountAlert nextClosingDate nextExpirationDate',
    };
    try {
        const updatedCreditCard = await creditCardServices.getOneCreditCardsByFilter(filterOptions);

        if (!updatedCreditCard) {
            throw new Error('Some filter failed, this is not supposed to happen');
        }
        updatedCreditCard.name = name || updatedCreditCard.name;
        updatedCreditCard.cycleAmountAlert = cycleAmountAlert || updatedCreditCard.cycleAmountAlert;
        updatedCreditCard.nextClosingDate = nextClosingDate || updatedCreditCard.nextClosingDate;
        updatedCreditCard.nextExpirationDate =
            nextExpirationDate || updatedCreditCard.nextExpirationDate;

        await updatedCreditCard.save();

        return res.status(200).json({
            response_data: updatedCreditCard,
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

// Credit Card controller to work with its related partners
export const addOrEditPartnerToCreditCard = async (req: PostPartnerRequest, res: JsonResponse) => {
    const uid = req.headers.authId;
    const { id } = req.params;
    const { userEmail, userUsername, canEdit } = req.body;

    const userFilterOptions: UserFilterOptions = {
        filter: { isDeleted: false, $or: [{ username: userUsername }, { email: userEmail }] },
        projection: '_id',
    };

    const ccFilterOptions: CCFilterOptions = {
        filter: { _id: id, isDeleted: false },
        projection: 'partners',
    };
    try {
        const userPartner = await userServices.getOneUserByFilter(userFilterOptions);
        if (!userPartner) {
            return;
        }
        // * Must fails if logged user and partner are the same
        if (userPartner._id?.toString() === uid) {
            return res.status(400).json({
                response_data: null,
                errors: [
                    {
                        msg: "Owner and partner can't be the same user",
                    },
                ],
            });
        }

        const creditCard = await creditCardServices.getOneCreditCardsByFilter(ccFilterOptions);
        if (!creditCard) {
            return;
        }
        let createNew = true;
        creditCard.partners.map((partner) => {
            if (!(partner.user._id?.toString() === userPartner._id?.toString())) {
                return;
            }
            createNew = false;
            partner.canEdit = !!canEdit;
            Logger.info(creditCard);
        });
        if (createNew) {
            creditCard.partners.push(new Partner({ user: userPartner, canEdit: !!canEdit }));
        }
        creditCard.save();

        res.status(200).json({
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

export const deletePartnerById = async (req: DeletePartnerRequest, res: JsonResponse) => {
    const { id, partnerId } = req.params;

    const filterOptions: CCFilterOptions = {
        filter: { _id: id, isDeleted: false },
        projection: 'partners',
    };
    try {
        const creditCard = await creditCardServices.getOneCreditCardsByFilter(filterOptions);
        const { modifiedCount } = await creditCard?.update({
            $pull: { partners: { _id: partnerId } },
        });
        return res.status(200).json({
            response_data: !!modifiedCount,
            errors: [],
        });
    } catch (err) {
        Logger.error(err);
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

// ! DELETE - Temporal response
export const notImplemented = async (req: Request, res: JsonResponse) => {
    res.status(501).json({
        response_data: null,
        errors: [
            {
                msg: 'Not implemented yet',
            },
        ],
    });
};
