import { SequelizeOptions } from "sequelize-typescript";
import * as dotenv from 'dotenv';
dotenv.config()

const SequelizeConfig: SequelizeOptions = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [__dirname + '/../modules/**/*.entity.{ts,js}']
}

export default SequelizeConfig
