import 'dotenv/config';

// create express app
import express from 'express';
const app = express();

// declare __dirname
import path from 'path';
import { URL } from 'url';
const __dirname = path.dirname(new URL('views', import.meta.url).pathname);

// ejs view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// serve static files
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// body parser middleware
app.use(express.urlencoded({ extended: true }));

// Connect to DB
import mongoose from 'mongoose';
await mongoose.connect(process.env.DB_CONNECTION_STRING);
console.log('The app connected to mongodb successfully');
// start the web server
app.listen(process.env.PORT, () => {
  console.log(`The app listening on port ${process.env.PORT}`);
});
