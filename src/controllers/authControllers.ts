import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import UserModel from '../models/user';

interface ValidationError extends Error {
  message: string;
  code: number;
  errors: {
    email: MongooseError.ValidatorError,
    password: MongooseError.ValidatorError
  },
  _message: string;
}

interface ErrorNameMessageMapping {
  email: string;
  password: string;
}

const handleErrors = (err: ValidationError): ErrorNameMessageMapping => {
  // duplicate error code
  if (err.code === 11000) {
    return { email: 'that email is already registered', password: '' };
  }
  // validation errors
  if (err.message.includes('user validation failed')) {
    const errorCollection = Object.values(err.errors).reduce((collection, errorItem) => (
      { ...collection, [errorItem.path]: errorItem.properties.message }
    ), {});
    return errorCollection as ErrorNameMessageMapping;
  }

  return { email: '', password: '' };
};

export const signupGet = (req: Request, res: Response) => res.status(200).json({ data: 'signup get' });

export const signupPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { _id: createdId, email: createdEmail } = await UserModel.create({ email, password });
    res.status(201).json({ result: 'Success', user: { id: createdId, email: createdEmail } });
  } catch (err) {
    const errorDetail = handleErrors(err);
    res.status(400).json({ reason: 'createUserFail', data: errorDetail });
  }
};

export const loginGet = (req: Request, res: Response) => res.status(200).json({ data: 'login get' });

export const loginPost = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ result: 'Success' });
};
