import express from 'express';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

/**
 * This line in your Express application creates an instance of an Express router.  An Express router acts like a mini-application, 
 * allowing you to group related routes together and define middleware specific to that group of routes. 
 * 
 * @date 27/03/2024 - 00:41:09
 *
 * @type {*}
 */
const router = express.Router();

//READ 
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

//UPDATE
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
