"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Obra = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Obra = connection_1.default.define('obra', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
    },
    anio: {
        type: sequelize_1.DataTypes.INTEGER
    },
    precio: {
        type: sequelize_1.DataTypes.FLOAT
    },
    categoria: {
        type: sequelize_1.DataTypes.STRING
    },
    tecnica: {
        type: sequelize_1.DataTypes.STRING
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING
    },
    alt: {
        type: sequelize_1.DataTypes.STRING
    },
    disposicion: {
        type: sequelize_1.DataTypes.STRING
    },
    reciente: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    }
});
