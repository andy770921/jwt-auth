import { Router } from 'express';
import { signupPost, loginPost } from '../controllers/authControllers';

const authRouter = Router();

authRouter.post('/signup', signupPost);
authRouter.post('/login', loginPost);

export default authRouter;
