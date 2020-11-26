import { Request, Response } from 'express';

export const signupGet = (req: Request, res: Response) => res.status(200).json({ data: 'signup get' });
export const signupPost = (req: Request, res: Response) => res.status(200).json({ data: 'signup post' });
export const loginGet = (req: Request, res: Response) => res.status(200).json({ data: 'login get' });
export const loginPost = (req: Request, res: Response) => res.status(200).json({ data: 'login post' });
