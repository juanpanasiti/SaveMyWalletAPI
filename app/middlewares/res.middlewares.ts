import { NextFunction, Request, Response } from 'express';
import { generateJWT, mustRenewToken, verifyJWT } from '../helpers/jwt';

export const responseInterceptor = async (req: Request, res: Response, next: NextFunction) => {
    const jsonResponse = res.json;
    res.json = function (response): any {
        const token = req.header('g-token');
        if (token) {
            const { exp, uid } = verifyJWT(token);
            if (mustRenewToken(exp)) {
                generateJWT(uid)
                    .then((newToken) => (response.token = newToken))
                    .finally(() => jsonResponse.apply(res, [response]));
            } else {
                jsonResponse.apply(res, [response]);
            }
        } else {
            jsonResponse.apply(res, [response]);
        }
    };
    next();
};
