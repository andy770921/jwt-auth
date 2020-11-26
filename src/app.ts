import express from 'express';
import mongoose from 'mongoose';

const app = express();

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

app.get('/', (req, res) => res.send('Home Page Route'));

app.get('/about', (req, res) => res.send('About Page Route'));

app.get('/api', (req, res) => res.status(200).json({ data: 'api' }));
