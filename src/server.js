import express from "express";
import { createServer } from 'node:http';
const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


import router from "./routes/index.js";
import expressLayouts from 'express-ejs-layouts';
import connect from './database/db.js';

import * as path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const PORT = 3000 || process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// view engine setup
app.use(expressLayouts)
app.set('layout', './layouts/base')
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname,'..', 'views'));

connect();

app.use("/api", router);

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});