import { Request, Response, NextFunction } from 'express';
import passport, { Passport } from 'passport';
import bcrypt from 'bcryptjs';

import User, { typeUser } from '../schemas/User';
import Note from '../schemas/Note';

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate('local', (err: Error, user: typeUser, info: any) => {
		if (err) {
			return next(err);
		}

		if (!user) {
			return res
				.status(401)
				.json({ message: 'Usuario o contraseña incorrectos' });
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}

			return res
				.status(200)
				.json({ message: 'Succses login', user: user });
		});
	})(req, res, next);
};

export const signUp = async (req: Request, res: Response) => {
	const { email, password, name } = req.body;

	if (!email || !password || !name) {
		return res.status(400).send({ error: 'Fill all fields' });
	}
	try {
		//view if the user already exists for unique email

		const existingUser = await User.findOne({ email }).lean();
		if (existingUser) {
			return res.status(400).send({ error: 'User already exists' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			username: name,
			email: email,
			password: hashedPassword,
		});

		await user.save();

		return res.status(201).send({ message: 'User created successfully' });
		//auto login after singup can be managed in the future
	} catch (error) {
		return res.status(400).send({ error: 'Something go wrong' });
	}
};

export const logOut = async (req: Request, res: Response) => {
	req.logout();
	return res.status(200).json({ message: 'Logout' });
};

export const deleteAccount = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).send({ error: 'Fill all fields' });
	}
	try {
		//view if the user already exists for unique email
		const user: typeUser = await User.findById(req.user._id);
		if (!user) {
			return res.status(400).send({ error: 'check the fies' });
		}

		//compare email
		if (user.email != email) {
			return res.status(400).send({ error: 'check the fields' });
		}

		//compare password
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return res.status(400).send({ error: 'check the fields' });
		}
		//console.log(user._id.toString() == req.user._id.toString(), user._id, req.user._id);
		//compare id
		if (user._id.toString() != req.user._id.toString()) {
			return res.status(400).send({ error: 'you are not the user' });
		}

		//remove user and their notes
		await Note.deleteMany({ userId: user._id });
		await User.findByIdAndDelete(user._id);
		req.logout();
		return res.status(200).send({ message: 'User deleted' });
	} catch (error) {
		return res.status(400).send({ error: 'Something go wrong' });
	}
};
