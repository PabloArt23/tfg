"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategorias = void 0;
const obra_1 = require("../models/obra");
const sequelize_1 = __importDefault(require("sequelize/types/sequelize"));
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoriasDistintas = yield obra_1.Obra.findAll({
            attributes: [
                [sequelize_1.default.fn('DISTINCT', sequelize_1.default.col('categoria')), 'categoria']
            ],
        });
        res.json(categoriasDistintas);
    }
    catch (error) {
        // Maneja errores apropiadamente
        res.status(500).json({ error: 'Ha ocurrido un error al obtener las categorías.' });
    }
});
exports.getCategorias = getCategorias;
