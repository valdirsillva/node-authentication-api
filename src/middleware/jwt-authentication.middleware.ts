import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';

function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
   try {
      
    const authorizationHeader = req.headers['authorization'];


    if (!authorizationHeader) {
        throw new ForbiddenError('Credenciais não informadas');
    }

    const [authenticationType, token ] = authorizationHeader.split(' ');

    if (authenticationType !== 'Bearer' || !token) {
        throw new ForbiddenError('Autenticacao invalida');
    }

     try {
      const tokenPayload = JWT.verify(token, 'secret_key');

      if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
        throw new ForbiddenError('Token inválido');
      }
      
      const user = {
         uuid: tokenPayload.sub,
         username: tokenPayload.username
      };
  
      req.user = user;
      next();
     } catch(error) {
      throw new ForbiddenError('Token inválido');
     }


   } catch(error) {
      next(error);  
   }
}

export default jwtAuthenticationMiddleware;