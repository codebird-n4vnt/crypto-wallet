import dotenv from "dotenv"
dotenv.config();
import express from 'express';
import { signIn, signUp } from './controller/UserController.js';
import { DBConnect } from './middleware/db.js';
import { Transaction } from "@solana/web3.js";
import cors from 'cors'
import { signTxn } from "./controller/TxnController.js";
import { isAuth } from "./middleware/auth.js";
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieParser());



app.post("/api/v1/signup", signUp);
app.post("/api/v1/signin", signIn);
app.post("/api/v1/txn/sign",signTxn) 
app.get("/api/v1/check",isAuth,(req,res)=>console.log('user fetched successfully'));

app.listen(3000,()=>{
    DBConnect();
})