import express from "express";
import cors from "cors";
import "express-async-errors";
var app = express();
app.use(cors());
app.use(express.json());
export default app;
