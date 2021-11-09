import { Router } from 'express';
import passport from 'passport';

const router = Router();

import {getNotes} from '../controllers/noteController';


router.get('/notes',getNotes)

export default router;