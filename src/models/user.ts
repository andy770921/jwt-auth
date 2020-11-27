import { Schema, model, Document } from 'mongoose';
import { isEmail } from 'validator';

interface User extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter an password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
});

const UserModel = model<User>('user', userSchema);

export default UserModel;
