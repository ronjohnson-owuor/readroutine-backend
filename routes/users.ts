import express from "express";
import normalSignin from "../modules/normalsignup";
import googleSignin from "../modules/googleSignup";
import normalLogin from "../modules/normalLogin";

const router = express.Router();

router.post("/normal-signin", async (req,res)=> {await normalSignin(req,res)});
router.post("/google-signin", async (req,res)=> {await googleSignin(req,res)});
router.post("/normal-login", async (req,res)=> {await normalLogin(req,res)});
export default router;