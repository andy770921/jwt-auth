import {
  Schema, model, Document, Model,
} from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';

interface UserDocumentInterface extends Document {
  email: string;
  password: string;
}

interface UserModelInterface extends Model<UserDocumentInterface> {
  login(email: string, password: string): any;
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

userSchema.pre<UserDocumentInterface>('save', async function (next) {
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

// static method to login user

userSchema.statics.login = async function (email: string, password: string | number) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password.toString(), user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const UserModel = model<UserDocumentInterface, UserModelInterface>('user', userSchema);

export default UserModel;
