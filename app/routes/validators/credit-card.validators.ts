import { body, query, param } from 'express-validator';
import { creditCardExists, userMustBeOwnerCC } from '../../middlewares/db-middlewares';
import { fieldValidate, filterValidFields } from '../../middlewares/field-middlewares';
import { validateJWT } from '../../middlewares/jwt-middlewares';

export const commons = [validateJWT];

export const create = [
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
];

export const getAll = [
    query('skip', 'Must be a positive integer')
        .if((skip: number) => !!skip)
        .isInt(),
    query('limit', 'Must be a positive integer')
        .if((limit: number) => !!limit)
        .isInt(),
    fieldValidate,
];

export const getOne = [
    param('id', 'Must be a valid ObjectID of Mongo').isMongoId(),
    fieldValidate,
    creditCardExists(),
    query('partners', 'Indicates if partners must be in the response').toBoolean(),
    query('purchases', 'Indicates if purchases must be in the response').toBoolean(),
    query('cycles', 'Indicates if cycles must be in the response').toBoolean(),
];

export const editOne = [
    param('id', 'Must be a valid ObjectID of Mongo').isMongoId(),
    creditCardExists(),
    userMustBeOwnerCC,
    filterValidFields(['name', 'cycleAmountAlert', 'nextClosingDate', 'nextExpirationDate']),
    fieldValidate,
];

export const deleteOne = [
    param('id', 'Must be a valid ObjectID of Mongo').isMongoId(),
    creditCardExists(),
    userMustBeOwnerCC,
    fieldValidate,
];
