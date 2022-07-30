import { atLeastOneExists, fieldValidate, filterValidFields } from '../../middlewares/field-middlewares';
import { body } from 'express-validator';
import { userFieldExists } from '../../helpers/db-validators';
import { validateJWT } from '../../middlewares/jwt-middlewares';

export const register = [
    filterValidFields(['username', 'password', 'email']),
    body('password', 'Password is mandatory and must have 8 chars min.').isLength({ min: 8 }),
    body('email', 'The email is invalid').isEmail(),
    body('username', 'The username must have between 8 and 16 characters.').isLength({
        min: 8,
        max: 16,
    }),
    body('email').custom((value) => userFieldExists('email', value)),
    body('username').custom((value) => userFieldExists('username', value)),
    fieldValidate,
];

export const login = [
    atLeastOneExists(['username', 'email']),
    body('email', 'The email is invalid')
        .if((value: string) => !!value)
        .isEmail(),
    body('password', 'Password is mandatory').not().isEmpty(),
    fieldValidate,
];

export const token = [validateJWT];
