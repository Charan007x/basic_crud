import express from 'express'; 
import { getUsers, registerUser } from '../controllers/userController.js';
const router=express.Router();

router.get('/getUsers',getUsers);

router.post('/register',registerUser);
export default router;