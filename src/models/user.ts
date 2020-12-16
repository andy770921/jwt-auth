import { Schema, model, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';

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

// functions fired before docs saved to db

userSchema.pre<User>('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log('user about to be created', this);
  next();
});

// functions fired after docs saved to db

userSchema.post('save', (doc, next) => {
  console.log('new user was created and saved', doc);
  next();
});

const UserModel = model<User>('user', userSchema);

export default UserModel;
