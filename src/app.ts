import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/authRoutes';

const app = express();

// middleware

app.use(express.json());

// database connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL!, {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
    });
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  } catch (err) {
    console.error('error: ', err);
  }
})();

// Routes
app.get('/', (req, res) => res.send('Home Page Route'));

app.use(authRouter);
