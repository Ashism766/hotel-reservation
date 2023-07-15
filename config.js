import {config} from "dotenv";
config();


export default {
    
    database: {
        username: "postgres",
        password: process.env.POSTGRES_PASSWORD,
        database: "reservation",
        host: "localhost",
        port: 5432,
        dialect: "postgres"
    },

    jwtSecret: "Somerandome string I feel like I can say anythig"
    
};