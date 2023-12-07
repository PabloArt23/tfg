"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
//mail
const express = require('express');
const app = express();
let cors = require('cors');
const bodyparser = require('body-parser');
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(require('./routes/correo'));
app.listen('3003', () => {
    console.log('escuchando');
});
//Configuramos dotenv
dotenv_1.default.config;
const server = new server_1.default();
