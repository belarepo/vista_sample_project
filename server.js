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
