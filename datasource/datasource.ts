import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

let dbType:any = (process.env.DB_TYPE) || 'mysql';
const data_source = new DataSource({
    type:dbType,
    host:process.env.DB_HOST,
    port: Number(process.env.DB_PORT!) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities:['entities/*.entity.ts'],
    migrations:['migrations/*.ts']
});
export default data_source;