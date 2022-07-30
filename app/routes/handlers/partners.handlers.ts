import {
    atLeastOneExists,
    fieldValidate,
    filterValidFields,
} from '../../middlewares/field-middlewares';
import { body } from 'express-validator';
import { creditCardExists, userMustBeOwnerCC } from '../../middlewares/db-middlewares';

export const addNew = [
    atLeastOneExists(['userUsername', 'userEmail']),
    filterValidFields(['userUsername', 'userEmail', 'canEdit']),
    body('canEdit', 'Indicates if partners can edit some CC data').isBoolean(),
    creditCardExists,
    userMustBeOwnerCC,
    fieldValidate,
];

export const editOne = [
    atLeastOneExists(['userUsername', 'userEmail']),
    filterValidFields(['userUsername', 'userEmail', 'canEdit']),
    body('canEdit', 'Indicates if partners can edit some CC data').isBoolean(),
    creditCardExists,
    userMustBeOwnerCC,
    fieldValidate,
];

export const deleteOne = [creditCardExists, userMustBeOwnerCC];
