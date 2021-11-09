import { Router } from 'express';
import passport from 'passport';

const router = Router();

import {singUp, login} from '../controllers/userController';


router.post("/singup", singUp);

router.post("/login",login,function(req,res){
    res.json({
        message: "login success"
    })
});




export default router;