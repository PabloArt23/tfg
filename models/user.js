"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.User = connection_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    alias: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    contrasenia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
});
