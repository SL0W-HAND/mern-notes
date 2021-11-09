import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import  User  from '../schemas/User';

//import Note  from '../schemas/Note';

export const login = async (req:Request, res:Response,next:NextFunction) =>{
    passport.authenticate('local', { successMessage: 'Successful Login',failureMessage: 'Invalid Login' })
    next();
}

export const singUp = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    console.log(req.body);
    if (!email || !password || !name) {
        return res.status(400).send({ error: 'Fill all fields' });
    }
    
    const user = new User({ 
        username:name ,
        email:email ,
        password: password,
     });
     await user.save();
     res.send('user save')

    return res.send({ user });
}
