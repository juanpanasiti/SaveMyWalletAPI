import { body, param } from 'express-validator';
import { Roles, Status } from '../../constants/enums';
import { fieldValidate, filterValidFields } from '../../middlewares/field-middlewares';
import { validateJWT } from '../../middlewares/jwt-middlewares';
import { checkPermissionAndExistence, hasRole } from '../../middlewares/role-middlewares';

export const commons = [validateJWT];

export const getAll = [hasRole([Roles.ADMIN, Roles.SUPER_ADMIN]), fieldValidate];

export const getOne = [param('id', "It isn't a valid uid.").isMongoId(), fieldValidate, checkPermissionAndExistence];

export const update = [
    filterValidFields(['username', 'password', 'email', 'img', 'status', 'role', 'profile']),
    body('role', 'Role is invalid')
        .if((role: string) => !!role)
        .isIn(Object.values(Roles)),
    body('status', 'Status is invalid')
        .if((status: string) => !!status)
        .isIn(Object.values(Status)),
    fieldValidate,
    checkPermissionAndExistence,
];

export const deleteOne = [hasRole([Roles.SUPER_ADMIN]), fieldValidate];
