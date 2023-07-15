import express from "express";

import { createRoom } from "./controller.js";

const Router = express.Router();


Router.post("/room/create", createRoom);
Router.get("/room", (req, res)=> {res.send("hello this is inside room route");});


export default Router;