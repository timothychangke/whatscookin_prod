import express from 'express';
import { login } from '../controllers/auth.js';
import {register} from '../controllers/auth.js'

/**
 * This line in your Express application creates an instance of an Express router.  An Express router acts like a mini-application, 
 * allowing you to group related routes together and define middleware specific to that group of routes. 
 * 
 * @date 27/03/2024 - 00:40:04
 *
 * @type {*}
 */
const router = express.Router();

//POST
//so the route is '/auth/login'
router.post("/login", login);

export default router;
