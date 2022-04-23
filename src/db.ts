import { Pool } from "pg";
import 'dotenv/config';

/**
 * Arquivo responsavel pela configuração do banco de dados
 */

const connectionString = process.env.POSTGRES_URL;

const db = new Pool({ connectionString }); 

export default db; 