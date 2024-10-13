import express from "express"
import path from "path"
import router from "./routes/index.js";
import expressLayouts from 'express-ejs-layouts';
import connect from './database/db.js';

const PORT = 3000 || process.env.PORT;
const server = express();
server.use(express.json());
server.use(express.static('public'));

// view engine setup
server.use(expressLayouts)


server.set('layout', path.join(__dirname, '/views/layouts/base'))

path.join(__dirname, '/views/layouts/base')

server.set('view engine', 'ejs');

connect();

server.use("/api", router);

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
