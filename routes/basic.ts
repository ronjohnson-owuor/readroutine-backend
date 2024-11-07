import express from "express";


const router = express.Router();
router.get('/user',(req,res)=>{
    console.log(`GET /  status:${req.statusCode}`);
    res.json("you are not suppose to be here");
});
export default router;