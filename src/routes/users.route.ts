import { Router, Response, Request, NextFunction } from 'express';

const usersRoute = Router();

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction ) => {
    const users = [{ userName: 'Valdir' }];

    res.status(200).send(users)
});




export default usersRoute;