import express from "express";


const router = express.Router();
router.get('/',(req,res)=>{
    res.json({web_bot:"you are not suppose to be here"});
});
export default router;