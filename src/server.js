import express from "express";
import router from "./routes/index.js";
import expressLayouts from 'express-ejs-layouts';
import connect from './database/db.js';

import * as path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const PORT = 3000 || process.env.PORT;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

// view engine setup
server.use(expressLayouts)
server.set('layout', './layouts/base')
server.set('view engine', 'ejs');

server.set('views', path.join(__dirname,'..', 'views'));

connect();

server.use("/api", router);

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});