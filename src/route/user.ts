import express from 'express';
import UserController from '../controller/user';

const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get("/",UserController.getproduct)


export default router;
