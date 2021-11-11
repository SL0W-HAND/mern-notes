import { notDeepStrictEqual } from 'assert';
import { Request, Response } from 'express';

//import Schemas
import Note, { typeNote } from '../schemas/Note';
import User, { typeUser } from '../schemas/User';

//extend interface
declare global {
	namespace Express {
		interface User {
			_id: any;
			numberOfNotes: number;
			notes: string[];
		}
	}
}

//get all notes
export const getAllNotes = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({
			message: 'Not authorized',
		});
	}

	const user: typeUser = await User.findById(req.user._id).lean();

	if (user.notes.length === 0) {
		return res.status(200).json({
			message: 'not notes to show',
			notes: [],
		});
	}

	const Notes = await Note.find({ userId: user._id }).lean();

	return res.status(200).json({
		message: 'notes to show',
		notes: Notes,
	});
};

//get note by id
export const getNote = async (req: Request, res: Response) => {
	if (!req.params.id)
		return res.status(400).json({ message: 'id is required' });

	try {
		const note: typeNote = await Note.findById(req.params.id).lean();

		if (!req.user) {
			return res.status(401).json({
				message: 'Not authorized',
			});
		}

		if (req.user._id != note.userId) {
			return res.status(401).json({
				message: 'Not authorized',
			});
		}

		if (!note) {
			return res.status(404).json({
				message: 'Note not found',
			});
		}

		return res.send(note).status(200);
	} catch (err) {
		return res.status(400).json({ message: 'bad request' });
	}
};

//create a note
export const createNote = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({
			message: 'Not authorized',
		});
	}

	const { title, description } = req.body;

	if (!title || !description) {
		return res
			.status(400)
			.json({ message: 'title and description are required' });
	}

	const newNote: typeNote = new Note({
		title: title,
		description: description,
		userId: req.user._id,
	});

	await newNote.save();

	await User.findByIdAndUpdate(req.user._id, {
		$push: { notes: newNote._id },
		$inc: { numberOfNotes: 1 },
	});

	return res.status(201).json({
		message: 'note created',
	});
};

//update a note
export const updateNote = async (req: Request, res: Response) => {
	//see if exist params
	if (!req.params.id)
		return res.status(400).json({ message: 'id is required' });

	//see if exist body
	if (!req.body.title || !req.body.description) {
		return res
			.status(400)
			.json({ message: 'title and description are required' });
	}

	//check if user exist
	if (!req.user) {
		return res.status(401).json({
			message: 'Not authorized',
		});
	}

	const { title, description } = req.body;

	try {
		const note: typeNote = await Note.findById(req.params.id).lean();

		if (!note) {
			return res.status(404).json({
				message: 'Note not found',
			});
		}

		if (req.user._id != note.userId) {
			return res.status(401).json({
				message: 'Not authorized',
			});
		}

		await Note.findByIdAndUpdate(req.params.id, {
			title: title,
			description: description,
		});

		return res.status(200).json({
			message: 'Note updated',
		});
	} catch (err) {
		return res.status(400).json({ message: 'bad request' });
	}
};

//delete a note
export const deleteNote = async (req: Request, res: Response) => {
	//see if exist params
	if (!req.params.id)
		return res.status(400).json({ message: 'id is required' });

	//check if user exist
	if (!req.user) {
		return res.status(401).json({
			message: 'Not authorized',
		});
	}

	//find and delete
	try {
		const note: typeNote = await Note.findById(req.params.id).lean();

		if (!note) {
			return res.status(404).json({
				message: 'Note not found',
			});
		}

		if (req.user._id != note.userId) {
			return res.status(401).json({
				message: 'Not authorized',
			});
		}

		await Note.findByIdAndDelete(req.params.id);

		const userInfo = await User.findById(req.user._id).lean();

		const newNotes = userInfo.notes.filter((note) => note != req.params.id);

		await User.findByIdAndUpdate(req.user._id, {
			notes: newNotes,
			$inc: { numberOfNotes: -1 },
		});

		return res
			.json({
				message: 'Note deleted',
			})
			.status(200);
	} catch (err) {
		return res.status(400).json({ message: 'bad request' });
	}
};
