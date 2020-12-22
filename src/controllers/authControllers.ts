import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';

interface ErrorResponseBody<T = undefined>{
  reason: string;
  message?: string;
  data: T;
}
interface ValidationError extends Error {
  message: string;
  code: number;
  errors: {
    email: MongooseError.ValidatorError,
    password: MongooseError.ValidatorError
  },
  _message: string;
}

interface ValidationResponsedData {
  email: string;
  password: string;
}

const maxAge = 3 * 24 * 60 * 60;

const createJwtToken = (id: string) => jwt.sign({ id }, process.env.JWT_SIGNATURE!, {
  expiresIn: maxAge,
});

const handleErrors = (err: ValidationError): ErrorResponseBody<ValidationResponsedData> => {
  // duplicate error code
  if (err.code === 11000) {
    return { reason: 'emailDuplicated', data: { email: 'that email is already registered', password: '' } };
  }
  // validation errors
  if (err.message.includes('user validation failed')) {
    const errorCollection = Object.values(err.errors).reduce((collection, errorItem) => (
      { ...collection, [errorItem.path]: errorItem.properties.message }
    ), { email: '', password: '' });
    return { reason: 'invalidFormat', data: errorCollection };
  }

  return { reason: 'unexpectedError', message: err.message, data: { email: '', password: '' } };
};

export const signupPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { _id: createdId, email: createdEmail } = await UserModel.create({ email, password });
    const token = createJwtToken(createdId);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ result: 'Success', user: { id: createdId, email: createdEmail } });
  } catch (err) {
    const errorResponseBody = handleErrors(err);
    res.status(400).json(errorResponseBody);
  }
};

export const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { _id: id } = await UserModel.login(email, password);
    res.status(200).json({ result: 'Success', user: id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ result: 'Fail', message: err.message });
  }
};
