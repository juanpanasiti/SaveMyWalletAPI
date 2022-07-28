import { Request, Response } from 'express';
import {
    CCReqQuery,
    EditCreditCardBody,
    NewCreditCardBody,
} from '../interfaces/credit-card.interfaces';
import { PaginationQuery } from '../interfaces/path.interfaces';
import { JsonResponse as IJsonResponse } from '../interfaces/response.interfaces';

// Base types
export type JsonResponse = Response<IJsonResponse>;
export type PaginatedRequest = Request<{}, {}, {}, PaginationQuery>;

// Cretit Card Types
export type PostCCRequest = Request<{}, {}, NewCreditCardBody>;
export type GetOneCCRequest = Request<{ id: string }, {}, null, CCReqQuery>;
export type PutCCRequest = Request<{ id: string }, {}, EditCreditCardBody>;
