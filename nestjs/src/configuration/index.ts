import * as dotenv from "dotenv";
dotenv.config();

const { 
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_CHARSET ,
  CLEAN_NEST_MONGO_CONNECTION_STRING,
  APP_PORT,
} = process.env

export const DATA_BASE_CONFIGURATION = {
  mongoConnectionString: CLEAN_NEST_MONGO_CONNECTION_STRING as string,
};

export const MYSQL_CONFIGURATION = {
  user: MYSQL_USER,
  pass: MYSQL_PASSWORD,
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  port: Number(MYSQL_PORT),
  charset: MYSQL_CHARSET,
};

export const APP = {
  port: APP_PORT
};
  
