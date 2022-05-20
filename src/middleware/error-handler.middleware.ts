import { Request, Response, NextFunction } from 'express';
import DatabaseError from '../models/errors/database.error.model';
import { StatusCodes } from 'http-status-codes';

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof DatabaseError) {
        res.status(StatusCodes.BAD_REQUEST);
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandler;