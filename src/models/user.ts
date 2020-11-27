import { Schema, model, Document } from 'mongoose';

interface User extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const UserModel = model<User>('user', userSchema);

export default UserModel;
