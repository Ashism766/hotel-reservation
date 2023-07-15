import express from "express";

import { createRoom } from "./controller.js";
import { isAdmin } from "../../security/controller.js";
const Router = express.Router();


Router.post("/room/create",isAdmin, createRoom);



export default Router;