
import express from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import errorHandler from './middleware/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import jwtAuthenticationMiddleware from './middleware/jwt-authentication.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(statusRoute);

app.use(authorizationRoute);
app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);


// configuração dos Handlers error => middleware
app.use(errorHandler);

app.listen(3000, () => {
    console.log('App started');
})