import express from "express";
import * as dotenv from "dotenv";
import basic from "./routes/basic";
dotenv.config();

const app = express();
const PORT = process.env.PORT||8000;

app.use("/",basic);

app.listen(PORT,()=>{
    console.log(`app listening on http://localhost:${PORT}`);
})