import 'dotenv/config';

// create express app
import express from 'express';
const app = express();

// set __dirname
const __dirname = path.dirname(new URL('views', import.meta.url).pathname);

// ejs view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
