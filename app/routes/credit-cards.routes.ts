import { Router } from 'express';
import { body, query, param } from 'express-validator';

import * as creditCardsController from '../controllers/credit-cards.controllers';
import { validateJWT } from '../middlewares/jwt-middlewares';
import { fieldValidate, filterValidFields } from '../middlewares/field-middlewares';
import { creditCardExists } from '../middlewares/db-middlewares';

const router = Router();

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

export default router;
