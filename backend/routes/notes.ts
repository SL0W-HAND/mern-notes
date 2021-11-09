import { Router } from 'express';

const router = Router();

import {getNote} from '../controllers/noteController';


router.get('/note/:id',getNote)



export default router;