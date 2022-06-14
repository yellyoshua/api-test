import 'dotenv/config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';
import users_routes from './modules/users/users_routes.js';
import students_routes from './modules/students/students_routes.js';

const app = express();
const port = 3000;

await mongoose.connect(process.env.DATABASE_URL);

app.use(bodyParser.json());

app.listen(port, () => {
  users_routes(app);
  students_routes(app);
  
  console.log(`Start! http://localhost:${port}`);
});
