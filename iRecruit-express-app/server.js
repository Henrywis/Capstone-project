import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import { sequelize } from './database';
import { User, Post } from './models/index'

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});