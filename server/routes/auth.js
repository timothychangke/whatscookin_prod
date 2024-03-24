import express from 'express';
import { login } from '../controllers/auth.js';
import {register} from '../controllers/auth.js'

const router = express.Router();

//POST
//so the route is '/auth/login'
router.post("/login", login);

export default router;
