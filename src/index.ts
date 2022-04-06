
import  express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users.route'; 
import statusRoute from './routes/status.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(usersRoute);
app.use(statusRoute);

app.listen(3000, () => {
    console.log('App started');
})