import {config} from "dotenv";
config();


export default {
    
    database: {
        username: process.env.USER_NAME,
        password: process.env.POSTGRES_PASSWORD,
        database: "reservation",
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: "postgres"
    },

    jwtSecret: "Somerandome string I feel like I can say anythig"
    
};