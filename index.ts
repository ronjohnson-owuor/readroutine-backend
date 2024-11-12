import express from "express";
import * as dotenv from "dotenv";
import basic from "./routes/basic";
import users from "./routes/users";
import cors from "cors";
import data_source from "./datasource/datasource";
dotenv.config();

const app = express();
app.use(cors());
const limit = '1000mb';
app.use(express.json({limit}));
const PORT = process.env.PORT||8000;

app.use("/",basic);
app.use("/users-api",users);

data_source.initialize().then(()=>{
    console.log("database connected successfully");
    app.listen(PORT,()=>{
        console.log(`server running at port http://localhost:${PORT}`);
    })    
}).catch((error)=>{
    console.error("DB_ERROR: "+ error);
});
