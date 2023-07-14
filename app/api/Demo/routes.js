import  Express  from "express";
import {SayBy, SayHi} from "./controller.js";

const Router = Express.Router();


Router.get("/say-hi",SayHi);
Router.get("/say-by",SayBy);

Router.get("/hi", (req, res) => {
    res.send("shodfdfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
});

export default Router;