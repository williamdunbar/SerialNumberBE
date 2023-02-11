const express = require('express');
const app = express();

const server = require('http').createServer(app);
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("connection success"))
.catch(()=>console.log("connection error"));
require('dotenv').config();

app.use(require('./api/routers/router'));

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on *:${process.env.PORT}`);
});

