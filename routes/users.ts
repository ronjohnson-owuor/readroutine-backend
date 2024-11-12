import express from "express";
import normalSignin from "../modules/normalLogin";
import googleSignin from "../modules/googleLogin";

const router = express.Router();

router.post("/normal-signin", async (req,res)=> {await normalSignin(req,res)});
router.post("/google-signin", async (req,res)=> {await googleSignin(req,res)});
export default router;