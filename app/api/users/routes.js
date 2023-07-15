import express from "express";

import {
  findRoom,
  bookRoom,
  findAvailableDates,
  findAllRooms,
} from "./controller.js";

const Router = express.Router();

Router.get("/room/filter", findRoom);
Router.post("/room/book", bookRoom);
Router.get("/room/available", findAvailableDates);
Router.get("/room/all", findAllRooms);

export default Router;
