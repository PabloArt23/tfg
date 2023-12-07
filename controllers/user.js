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
exports.getUsers = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alias, contrasenia } = req.body;
    // Validamos si el usuario ya existe en la base de datos
    const user = yield user_1.User.findOne({ where: { alias } });
    if (user) {
        return res.status(400).json({
            msg: 'Ya existe un usuario en Artesanoterapeuta con el nombre "' + alias + '"'
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(contrasenia, 10);
    try {
        // Guardamos usuario en la base de datos
        yield user_1.User.create({
            alias: alias,
            contrasenia: hashedPassword
        });
        res.json({
            msg: 'Ya te has registrado en Artesanoterapeuta,' + alias,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'No se ha podido conectar a la base de datos',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, alias, contrasenia, gmail, rol } = req.body;
    //Validamos si el usuario existe en la base de datos
    const user = yield user_1.User.findOne({ where: { alias: alias } });
    if (!user) {
        return res.status(400).json({
            msg: "No hay ningún usuario registrado con el nombre " + alias
        });
    }
    //Validamos password
    const contraseniaValida = yield bcrypt_1.default.compare(contrasenia, user.contrasenia);
    if (!contraseniaValida) {
        return res.status(400).json({
            msg: "Contraseña introducida erronea, pruebe de nuevo"
        });
    }
    //Generamos token
    const token = jsonwebtoken_1.default.sign({
        id: id,
        alias: alias,
        rol: user.rol,
        gmail: user.gmail
    }, process.env.SECRET_KEY || 'pepito123', {
        expiresIn: '900000' //Esto equivale a 15 minutos
    });
    res.json(token);
});
exports.loginUser = loginUser;
//Recogemos los usuarios para comprobar sí el que se loguea es el admin o no
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaUsuarios = yield user_1.User.findAll();
    res.json(listaUsuarios);
});
exports.getUsers = getUsers;
