import { Router, Request, Response, NextFunction } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.model';
import userRepository from '../repositories/user.repository';
import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const authorizationRoute = Router();

authorizationRoute.post('/token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader) {
           throw new ForbiddenError('Credenciais não informada'); 
        }

        const [authenticationType, token] = authorizationHeader.split(' ');
     
        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = tokenContent.split(':');

        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Autenticacao invalida');
        }

        if (!username || !password) {
            throw new ForbiddenError('Credenciais nao preenchidas');
        }
        
        const user = await userRepository.findByUsernameAndPassword(username, password);
        console.log(user)

        if (!user) {
            throw new ForbiddenError('Usuário ou senha inválidos!'); 
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
