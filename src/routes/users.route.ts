import { Router, Response, Request, NextFunction } from 'express';
import { StatusCodes }  from 'http-status-codes';
import userRepository from '../repositories/user.repository';

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users)
});

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const user = await userRepository.findById(uuid);
    res.status(StatusCodes.OK).send(user);
})

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => { 
    const newUser = req.body;

    const uuid = await userRepository.create(newUser);

    res.status(StatusCodes.CREATED).send(uuid);
});

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;

    await userRepository.update(modifiedUser);

    res.status(StatusCodes.OK).send({ modifiedUser });
});

usersRoute.delete('/delete/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    
    res.status(StatusCodes.OK);
});

export default usersRoute;