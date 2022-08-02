import { param, query } from 'express-validator';
import { creditCardExists } from '../../middlewares/db-middlewares';
import { fieldValidate, filterValidFields } from '../../middlewares/field-middlewares';

export const getAll = [
    param('id', 'Must be a valid ObjectID of Mongo').isMongoId(),
    query('skip', 'Must be a positive integer')
        .if((skip: number) => !!skip)
        .isInt(),
    query('limit', 'Must be a positive integer')
        .if((limit: number) => !!limit)
        .isInt(),
    creditCardExists({ needEditAccess: false }),
    fieldValidate,
    query('limit')
        .default(5)
        .if((limit: number) => !!limit)
        .toInt(),
    query('skip')
        .default(0)
        .if((skip: number) => !!skip)
        .toInt(),
];

export const create = [
    param('id', 'Must be a valid ObjectID of Mongo').isMongoId(),
    creditCardExists({ needEditAccess: true }),
    filterValidFields(['itemNameCC', 'descriptiveName', 'detail', 'date', 'installmentCount', 'amount']),
    fieldValidate,
];

export const getOne = [
    param('id', 'Must be a valid ObjectID of Mongo').isMongoId(),
    param('purchaseId', 'Must be a valid ObjectID of Mongo').isMongoId(),
    creditCardExists({ needEditAccess: false }),
    // purchase must exists,
    fieldValidate,
];

export const update = [
    param('id', 'Must be a valid ObjectID of Mongo').isMongoId(),
    param('purchaseId', 'Must be a valid ObjectID of Mongo').isMongoId(),
    creditCardExists({ needEditAccess: true }),
    filterValidFields(['itemNameCC', 'descriptiveName', 'detail', 'date', 'installmentCount', 'amount']),
    // purchase must exists,
    fieldValidate,
];

export const deleteOne = [
    param('id', 'Must be a valid ObjectID of Mongo').isMongoId(),
    param('purchaseId', 'Must be a valid ObjectID of Mongo').isMongoId(),
    creditCardExists({ userMustBeOwner: true }),
    // purchase must exists,
    fieldValidate,
];
