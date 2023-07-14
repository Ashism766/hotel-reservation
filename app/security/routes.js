import express from "express";
import { userLogin, adminLogin, registerUser } from "./controller.js";

const Router = express.Router();


Router.post("/login",userLogin);
Router.post("/admin/login",adminLogin );
Router.post("/register", registerUser);


export default Router;


