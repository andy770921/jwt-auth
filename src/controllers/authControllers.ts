import { Request, Response } from 'express';
import UserModel from '../models/user';

export const signupGet = (req: Request, res: Response) => res.status(200).json({ data: 'signup get' });

export const signupPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { _id: createdId, email: createdEmail } = await UserModel.create({ email, password });
    res.status(201).json({ result: 'Success', user: { id: createdId, email: createdEmail } });
  } catch (err) {
    console.log('Signup Post error: ', err);
    res.status(400).json({ reason: 'createUserFail' });
  }
};

export const loginGet = (req: Request, res: Response) => res.status(200).json({ data: 'login get' });

export const loginPost = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ result: 'Success' });
};
