import express from "express";
import router from "./router.js";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors(process.CORS_ORIGIN));

app.use(express.json());

app.use(router);

export default app;
