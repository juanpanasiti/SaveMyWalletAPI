import jwt from 'jsonwebtoken';
import moment from 'moment';
import { ObjectId } from 'mongoose';

import { JWTPayload } from '../interfaces/auth.interfaces';
import Logger from './logger';

export const generateJWT = (uid: ObjectId | string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        const secret = process.env.PRIVATE_JWT_KEY || '';
        jwt.sign(
            payload,
            secret,
            {
                expiresIn: '24h',
            },
            (err, token) => {
                if (err || !token) {
                    Logger.error(`${err}`);
                    reject(`Something went wrong with the token generation (${err || 'no-token'}).`);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

export const verifyJWT = (token: string): JWTPayload =>{
    return jwt.verify(token, process.env.PRIVATE_JWT_KEY || '') as JWTPayload;
}

export const mustRenewToken = (exp: number): boolean => {
    const minHoursAlert = 5
    const diffInHours = moment.unix(exp).diff(moment.now(),'hours')

    return (minHoursAlert > diffInHours)
}
