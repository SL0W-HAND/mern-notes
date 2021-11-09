import { resolveSoa } from 'dns';
import { Request, Response } from 'express';

import  Note,{typeNote}  from '../schemas/Note';

import User from '../schemas/User';



declare global {
    namespace Express {
      interface User {
        _id: any;
        numberOfNotes: number;
      }
    }
  }

//get note of a user

export const getNote = async (req: Request, res: Response) => {
    //get note by id
    if(! req.params.id) return res.status(400).json({message: 'id is required'});

    try{

      if(!req.user){
        return res.status(401).json({
            message: 'Not authorized'
        });
    }
        const note:typeNote = await Note.findById(req.params.id);
         

        if(req.user._id !== note.userId){
            return res.status(401).json({
                message: 'Not authorized'
            });
        }

        if (!note){
        return res.status(404).send('Note not found');
        };

        res.send(note).status(200);
        }
    catch(err){
      return res.status(400).json({message: 'bad request'});
    }
}

//create a note
export const createNote = async (req: Request, res: Response) => {
    const {title, description} = req.body;

    if(!title || !description){
        res.status(400).json({message: 'title and description are required'});
    }

    const newNote:typeNote =  new Note({
        title: title,
        description: description,
        userId: req.user._id
    })
    await newNote.save();
    await User.findByIdAndUpdate(req.user._id,
      {$push: {notes: newNote._id}, $inc: {numberOfNotes: 1}});
    
    res.send('note updated').status(200);

}




//update a note


//delete a note