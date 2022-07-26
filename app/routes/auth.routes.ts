import { Router } from 'express';
import { body } from 'express-validator';

import * as authControllers from '../controllers/auth.controllers';
import { userFieldExists } from '../helpers/db-validators';
import {
    filterValidFields,
    fieldValidate,
    atLeastOneExists,
} from '../middlewares/field-middlewares';
import { validateJWT } from '../middlewares/jwt-middlewares';

const router = Router();

router.post(
    '/register',
    [
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
    ],
    authControllers.register
);

router.post(
    '/login',
    [
        atLeastOneExists(['username', 'email']),
        body('email', 'The email is invalid')
            .if((value: string) => !!value)
            .isEmail(),
        body('password', 'Password is mandatory').not().isEmpty(),
        fieldValidate,
    ],
    authControllers.login
);

router.get('/token', [validateJWT], authControllers.renewJWT);

export default router;
