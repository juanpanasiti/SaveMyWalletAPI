import { Router } from 'express';
import { body, query, param } from 'express-validator';

import * as creditCardsController from '../controllers/credit-cards.controllers';
import { validateJWT } from '../middlewares/jwt-middlewares';
import { atLeastOneExists, fieldValidate, filterValidFields } from '../middlewares/field-middlewares';
import { creditCardExists, userMustBeOwnerCC } from '../middlewares/db-middlewares';

const router = Router();

// Routes for Credit Cards C.R.U
router.post(
    '/',
    [
        validateJWT,
        filterValidFields(['name', 'cycleAmountAlert', 'nextClosingDate', 'nextExpirationDate']),
        body('name', 'Name is mandatory').exists({ checkNull: true }),
        body('nextClosingDate', 'Is required and must be in format YYYY-MM-DD').isDate({
            format: 'YYYY-MM-DD',
        }),
        body('nextExpirationDate', 'Is required and must be in format YYYY-MM-DD').isDate({
            format: 'YYYY-MM-DD',
        }),
        body('cycleAmountAlert', 'Is required and must be greather than zero and 2 decimals max')
            .if((amount: number) => !!amount)
            .isCurrency({ allow_decimal: true, allow_negatives: false, digits_after_decimal: [2] }),
        fieldValidate,
    ],
    creditCardsController.createCreditCard
);

router.get(
    '/',
    [
        validateJWT,
        query('skip', 'Must be a positive integer')
            .if((skip: number) => !!skip)
            .isInt(),
        query('limit', 'Must be a positive integer')
            .if((limit: number) => !!limit)
            .isInt(),
        fieldValidate,
    ],
    creditCardsController.getAllPaginated
);

router.get(
    '/:id',
    [
        validateJWT,
        param('id', 'Must be a valid ObjectID of Mongo').isMongoId(),
        fieldValidate,
        creditCardExists,
        query('partners', 'Indicates if partners must be in the response').toBoolean(),
        query('purchases', 'Indicates if purchases must be in the response').toBoolean(),
        query('cycles', 'Indicates if cycles must be in the response').toBoolean(),
    ],
    creditCardsController.getOneCreditCardById
);

router.put(
    '/:id',
    [
        validateJWT,
        param('id', 'Must be a valid ObjectID of Mongo').isMongoId(),
        creditCardExists,
        userMustBeOwnerCC,
        filterValidFields(['name', 'cycleAmountAlert', 'nextClosingDate', 'nextExpirationDate']),
        fieldValidate,
    ],
    creditCardsController.editOneCreditCardById
);

router.delete(
    '/:id',
    [
        validateJWT,
        param('id', 'Must be a valid ObjectID of Mongo').isMongoId(),
        creditCardExists,
        userMustBeOwnerCC,
        fieldValidate,
    ],
    creditCardsController.deleteOneCreditCard
);

// CRUD routes for Partners related to a Credit Card
router.post(
    '/:id/partners',
    [
        validateJWT,
        atLeastOneExists(['userUsername', 'userEmail']),
        filterValidFields(['userUsername', 'userEmail', 'canEdit']),
        body('canEdit', 'Indicates if partners can edit some CC data').isBoolean(),
        creditCardExists,
        userMustBeOwnerCC,
        fieldValidate,
    ],
    creditCardsController.addOrEditPartnerToCreditCard
);

router.put(
    '/:id/partners',
    [
        validateJWT,
        atLeastOneExists(['userUsername', 'userEmail']),
        filterValidFields(['userUsername', 'userEmail', 'canEdit']),
        body('canEdit', 'Indicates if partners can edit some CC data').isBoolean(),
        creditCardExists,
        userMustBeOwnerCC,
        fieldValidate,
    ],
    creditCardsController.addOrEditPartnerToCreditCard
);

router.put(
    '/:id/partners',
    [
        validateJWT,
        atLeastOneExists(['userUsername', 'userEmail']),
        filterValidFields(['userUsername', 'userEmail', 'canEdit']),
        body('canEdit', 'Indicates if partners can edit some CC data').isBoolean(),
        creditCardExists,
        userMustBeOwnerCC,
        fieldValidate,
    ],
    creditCardsController.addOrEditPartnerToCreditCard
);

router.delete(
    '/:id/partners/:partnerId',
    [
        validateJWT,
        creditCardExists,
        userMustBeOwnerCC,
    ],
    creditCardsController.deletePartnerById
);

export default router;
