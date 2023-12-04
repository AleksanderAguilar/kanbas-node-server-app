import express from "express";
import "dotenv/config";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import session from "express-session";

import mongoose from "mongoose";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";

import "dotenv/config";

// const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect('mongodb+srv://aleksanderaguilar:webdev123@cluster0.xg6z2gc.mongodb.net/kanbas?retryWrites=true&w=majority' ||'mongodb://127.0.0.1:27017/kanbas');

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);

app.listen(4000);
