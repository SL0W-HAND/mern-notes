import { Router } from 'express';
import passport from 'passport';

const router = Router();

import {
	signUp,
	login,
	deleteAccount,
	logOut,
} from '../controllers/userController';

import { isAuthenticated } from '../helpers/auth';

router.post('/signup', signUp);

router.post('/login', login);

router.post('/logout', isAuthenticated, logOut);

router.post('/deleate_account', isAuthenticated, deleteAccount);

export default router;
