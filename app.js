import {config} from  "dotenv";
config();
import express  from "express";
import cors from "cors";


import logger from "./app/utils/logger.js";
import SecurityRouter from "./app/security/routes.js";
import  {authenticateToken, isAdmin} from "./app/security/controller.js";
import RoomRouter from "./app/api/admin/routes.js";
import userRouter from "./app/api/users/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.use(SecurityRouter);
app.use(isAdmin,RoomRouter);
app.use(authenticateToken,userRouter);


app.get("/", (req, res)=>{res.send({"It's working": "yes"});});
app.get("/auth", authenticateToken, (req, res)=> res.send("hoorah! you're authenticated"));
app.get("/admin", isAdmin, async (req, res)=> res.send("Yes you're admin"));










const port = process.env.PORT || 3000;
app.listen(port, () => {
console.log(`Server started on port ${port}`);
logger.info(`Server started on port ${port}..............................................................`);
});