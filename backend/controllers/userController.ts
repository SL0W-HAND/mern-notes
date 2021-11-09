import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import  User,{typeUser}  from '../schemas/User';

//import Note  from '../schemas/Note';

export const login = async (req:Request, res:Response,next:NextFunction) =>{
    passport.authenticate('local', (err:Error, user:typeUser, info:any) => {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json({message: 'Usuario o contraseña incorrectos'}); }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.status(200).json({message: 'Login exitoso'});
        });
    }) (req, res, next);
}


export const singUp = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    console.log(req.body);
    if (!email || !password || !name) {
        res.status(400).send({ error: 'Fill all fields' });
    }

    //view if the user already exists
    
    //hash password
    const user = new User({ 
        username:name ,
        email:email ,
        password: password,
     });
     await user.save();
     res.send('user save')

     //auto login after singup

     res.send({ user });
}

export const logOut = async (req: Request, res: Response) => {
    req.logout();
    res.send('logout');
}


//deleate account