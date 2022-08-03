import { Request, Response } from 'express';
import { CCReqQuery, EditCreditCardBody, NewCreditCardBody } from '../interfaces/credit-card.interfaces';
import { NewPartnerBody } from '../interfaces/partner.interfaces';
import { PaginationQuery } from '../interfaces/path.interfaces';
import { NewPurchaseBody } from '../interfaces/purchase.interfaces';
import { JsonResponse as IJsonResponse } from '../interfaces/response.interfaces';

// Base types
export type JsonResponse = Response<IJsonResponse>;
export type PaginatedRequest = Request<{id: string}, {}, {}, PaginationQuery>;

// Credit Card Types
export type PostCCRequest = Request<{}, {}, NewCreditCardBody>;
export type GetOneCCRequest = Request<{ id: string }, {}, null, CCReqQuery>;
export type PutCCRequest = Request<{ id: string }, {}, EditCreditCardBody>;
export type DeleteCCRequest = Request<{ id: string }, {}, null>;

// Partners Types
export type PostPartnerRequest = Request<{ id: string }, {}, NewPartnerBody>;
export type DeletePartnerRequest = Request<{ id: string; partnerId: string }, {}, NewPartnerBody>;

// PurchaseTypes
export type PostPurchaseRequest = Request<{ id: string }, {}, NewPurchaseBody>;
export type GetOnePurchaseRequest = Request<{ id: string, purchaseId: string }, {}, NewPurchaseBody>;