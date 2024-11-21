/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";

config();

export const dataSourceOption: DataSourceOptions = {
  type: "mssql",
  host: process.env.MSS_HOST,
  port: parseInt(process.env.MSS_PORT),
  username: process.env.MSS_USERNAME,
  password: process.env.MSS_PASSWORD,
  database: process.env.MSS_DATABASE,
  entities: ['src/**/**/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
  subscribers: ['src/subscribes/*.{ts,js}'],
  synchronize: false,
  logging: true,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
};

const dataSource = new DataSource(dataSourceOption);

export default dataSource;
