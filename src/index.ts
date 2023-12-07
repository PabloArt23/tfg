import dotenv from 'dotenv';
import Server from "./models/server";

//mail
const express = require('express');
const app = express();
let cors = require('cors');
const bodyparser = require('body-parser');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))
app.use(require('./routes/correo'))


app.listen('3003', ()=>{
    console.log('escuchando')
})


//Configuramos dotenv
dotenv.config;

const server = new Server();
