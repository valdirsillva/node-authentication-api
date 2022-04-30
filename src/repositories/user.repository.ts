import db from '../db';
import User from '../models/user.model';

class UserRepository {
   
    async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT uuid, username 
            FROM app_user
        `;

        const { rows } = await db.query<User>(query);
    
        return rows || [];
    }
}


export default new UserRepository();