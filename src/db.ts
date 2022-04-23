import { Pool } from "pg";

/**
 * Arquivo responsavel pela configuração do banco de dados
 */

const connectionString = ''; 

const db = new Pool({ connectionString }); 

export default db;