import { Request, Response } from 'express';

export const getNotes = (req: Request, res: Response) => {
    //test request status
    console.log(req.isAuthenticated())
    console.log(req.user)
    res.send('get notes');
}