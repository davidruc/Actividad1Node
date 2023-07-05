import {config} from "dotenv";

config();

export default{
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.MY_USER,
    password: process.env.PASSWORD
}