import {config} from  "dotenv";
config();
import express  from "express";
import cors from "cors";


import logger from "./app/utils/logger.js";
import SecurityRouter from "./app/security/routes.js";
import  {authenticateToken} from "./app/security/controller.js";
import RoomRouter from "./app/api/admin/routes.js";
import userRouter from "./app/api/users/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.use(SecurityRouter);
app.use(RoomRouter);
app.use(authenticateToken,userRouter);





const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Server started on port ${port}`);
logger.info(`Server started on port ${port}..............................................................`);
});