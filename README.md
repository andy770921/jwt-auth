# TypeScript Node Server Deployed in Vercel

## TypeScript Node Server Example

```ts
import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Home Page Route'));

app.get('/about', (req, res) => res.send('About Page Route'));

app.get('/portfolio', (req, res) => res.send('Portfolio Page Route'));

app.get('/contact', (req, res) => res.send('Contact Page Route'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
```

## Install and Development

1. `npm install`

2. `npm run start`: compile TypeScript to JavaScript and start running local server

## Deployment

1. `npm run build`: compile TypeScript to JavaScript

2. [Vercel](https://vercel.com/) takes `dist/app.js` for deployment defined in `vercel.json`

## Reference Tutorial

[Deploying Apollo Server with TypeScript Path Aliases to Vercel](https://dev.to/ozanbolel/deploying-apollo-server-with-typescript-path-aliases-to-vercel-4k5l)

