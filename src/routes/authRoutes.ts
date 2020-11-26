import { Router } from 'express';
import {
  signupGet, signupPost, loginGet, loginPost,
} from '../controllers/authControllers';

const authRouter = Router();

authRouter.get('/signup', signupGet);
authRouter.post('/signup', signupPost);
authRouter.get('/login', loginGet);
authRouter.post('/login', loginPost);

export default authRouter;
