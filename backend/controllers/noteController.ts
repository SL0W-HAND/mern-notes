import { resolveSoa } from 'dns';
import { Request, Response } from 'express';

import  Note,{typeNote}  from '../schemas/Note';

import User, { typeUser } from '../schemas/User';



declare global {
    namespace Express {
      interface User {
        _id: any;
        numberOfNotes: number;
        notes:string[]
      }
    }
  }

//get note of a user

export const getAllNotes = async (req: Request, res: Response) => {
  if(!req.user){
    console.log('no user');
   return res.status(401).json({
        message: 'Not authorized'
    })
  };

  const user:typeUser = await User.findById(req.user._id).lean();


  if(user.notes.length === 0){
    
    return res.status(200).json({
        message: 'not notes to show'
    })
  };

  const Notes = user.notes.forEach(async (note:string) => {
    const noteToShow = await Note.findById(note).lean();
    return noteToShow;
  } )

  console.log(Notes);
}

export const getNote = async (req: Request, res: Response) => {
    //get note by id
    if(! req.params.id) return res.status(400).json({message: 'id is required'});

    try{
      const note:typeNote = await Note.findById(req.params.id);
      console.log(note,req.user);
      if(!req.user){
        console.log('no user');
       return res.status(401).json({
            message: 'Not authorized'
        });
    }
        //const note:typeNote = await Note.findById(req.params.id);
         
        console.log(req.user._id == note.userId,note.userId,req.user._id); 
        if(req.user._id != note.userId){
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
   
  if(!req.user){
     res.status(401).json({
        message: 'Not authorized'
    });

  }
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
export const updateNote = async (req: Request, res: Response) => {
  //see if exist params
  if(! req.params.id) return res.status(400).json({message: 'id is required'});
  //see if exist body
  if (!req.body.title || !req.body.description){
    return res.status(400).json({message: 'title and description are required'});
  }
//check if user exist
  if(!req.user){
    console.log('no user');
   return res.status(401).json({
        message: 'Not authorized'
    })
  };

  const {title, description} = req.body;

  try{
    const note:typeNote = await Note.findById(req.params.id);
  
    if(req.user._id != note.userId){
          return res.status(401).json({
              message: 'Not authorized'
          });
    }

    if (!note){
      return res.status(404).send('Note not found');
      };
      
      await Note.findByIdAndUpdate(req.params.id, {title: title, description: description});
      res.send('note updated').status(200);
    }
    
  catch(err){
    return res.status(400).json({message: 'bad request'});
  }
}

//delete a note

export const deleateNote = async (req: Request, res: Response) => {
  //see if exist params
  if(! req.params.id) return res.status(400).json({message: 'id is required'});
  //check if user exist
  if(!req.user){
    console.log('no user');
   return res.status(401).json({
        message: 'Not authorized'
    })
  };

  try{
    const note:typeNote = await Note.findById(req.params.id).lean();
    if(!note){
      return res.status(404).send('Note not found');
    }
    if(req.user._id != note.userId){
          return res.status(401).json({
              message: 'Not authorized'
          });
    }
    await Note.findByIdAndDelete(req.params.id);
    return res.send('note deleted').status(200); 
  }
  catch(err){
    return res.status(400).json({message: 'bad request'});
  }
}