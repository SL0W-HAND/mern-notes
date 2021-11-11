import { Router } from 'express';
import passport from 'passport';

const router = Router();

import {
	singUp,
	login,
	deleteAccount,
	logOut,
} from '../controllers/userController';

import { isAuthenticated } from '../helpers/auth';

router.post('/singup', singUp);

router.post('/login', login);

router.post('/logout', isAuthenticated, logOut);

router.post('/deleate_account', isAuthenticated, deleteAccount);

export default router;
