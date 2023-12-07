import { Sequelize } from "sequelize";

const express = require('express');

const sequelize = new Sequelize("artesanoterapeuta", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;