"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const express = require('express');
const sequelize = new sequelize_1.Sequelize("artesanoterapeuta", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = sequelize;
