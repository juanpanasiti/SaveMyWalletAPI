import { Location, Result, ValidationError } from 'express-validator';

export interface JsonResponse {
    response_data: any;
    errors: ErrorResponse[] | Result<ValidationError>;
    token?: string;
}

interface ErrorResponse {
    msg: string;
    param?: string;
    location?: Location;
    value?: string;
}
