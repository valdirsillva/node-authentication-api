import { Router, Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import ForbiddenError from '../models/errors/forbidden.error.model';
import jwtAuthenticationMiddleware from '../middleware/jwt-authentication.middleware';
import basicAuthenticationMiddleware from '../middleware/basic-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
})

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new ForbiddenError('Usuário não informado');
        }

        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user.uuid };
        const secretKey = 'secret_key';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK).json( { token: jwt } );
       
    } catch(error) {
      next(error);
    }
})


export default authorizationRoute;
