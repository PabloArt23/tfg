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
exports.obtenerObrasGaleria = exports.obtenerCarteles = exports.obtenerRetratos = exports.obtenerObrasRecientes = exports.obtenerCategoriasYDirecciones = exports.obtenerCategorias = exports.borrarObra = exports.actualizarObra = exports.getObraAEditar = exports.newObra = exports.getObras = void 0;
const obra_1 = require("../models/obra");
const connection_1 = __importDefault(require("../db/connection"));
//import sequelize from 'sequelize/types/sequelize';
//OBTENER TODAS LAS OBRAS
const getObras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orden = req.query.orden; // Obtén el valor de orden desde los parámetros de consulta
    if (typeof orden === 'string') {
        const listObras = yield obra_1.Obra.findAll({
            order: [['id', orden || 'asc']],
        });
        res.json(listObras);
    }
});
exports.getObras = getObras;
//INSERTAR NUEVA OBRA
const newObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, anio, precio, categoria, tecnica, imagen, alt, disposicion, reciente, descripcion, direccion } = req.body;
    const datos = req.body;
    console.log(datos);
    // Validamos si la obra ya existe en la base de datos
    const obra = yield obra_1.Obra.findOne({ where: { titulo } });
    if (obra) {
        return res.status(400).json({
            msg: 'Ya existe una obra con el nombre"' + obra + '"'
        });
    }
    try {
        // Guardamos obra en la base de datos
        yield obra_1.Obra.create({
            titulo: titulo,
            anio: anio,
            precio: precio,
            categoria: categoria,
            tecnica: tecnica,
            imagen: imagen,
            alt: alt,
            disposicion: disposicion,
            reciente: reciente,
            descripcion: descripcion,
            direccion: direccion
        });
        res.json({
            msg: 'La obra "' + titulo + '", ya está registrada',
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'No se ha podido conectar a la base de datos',
            error
        });
    }
});
exports.newObra = newObra;
//SELECCIONAR OBRA A ACTUALIZAR
const getObraAEditar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const obraId = req.params.id;
    try {
        const obra = yield obra_1.Obra.findByPk(obraId);
        if (!obra) {
            return res.status(404).json({ error: 'Obra no encontrada' });
        }
        return res.json(obra);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error al buscar la obra' });
    }
});
exports.getObraAEditar = getObraAEditar;
//ACTUALIZAR OBRA SELECCIONADA
const actualizarObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const obraId = req.params.id; // Obtiene el ID de la obra de los parámetros de la URL
    const nuevosDatos = req.body; // Los nuevos datos a actualizar deben enviarse en el cuerpo de la solicitud
    try {
        // Busca la obra por su ID en la base de datos
        const obra = yield obra_1.Obra.findByPk(obraId);
        console.log(obraId);
        console.log(nuevosDatos);
        if (!obra) {
            return res.status(404).json({ error: 'Obra no encontrada' });
        }
        // Actualiza los datos de la obra con los nuevos datos
        yield obra.update(nuevosDatos);
        return res.status(200).json({ message: 'Obra actualizada con éxito' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error al actualizar la obra' });
    }
});
exports.actualizarObra = actualizarObra;
//BORRAR OBRA
const borrarObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const obraId = req.params.id; // Obtiene el ID de la obra de los parámetros de la URL
    try {
        // Busca la obra por su ID en la base de datos
        const obra = yield obra_1.Obra.findByPk(obraId);
        console.log(obraId);
        console.log(obra);
        yield (obra === null || obra === void 0 ? void 0 : obra.destroy());
        return res.status(200).json({ message: 'Obra actualizada con éxito' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error al actualizar la obra' });
    }
});
exports.borrarObra = borrarObra;
//OBTNER LAS DISTINTAS CATEGORIAS 
const obtenerCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoriasDistintas = yield obra_1.Obra.findAll({
            attributes: [[connection_1.default.fn('DISTINCT', connection_1.default.col('categoria')), 'categoria']]
        });
        // Extrae los valores de la respuesta de la base de datos
        const categorias = categoriasDistintas.map((obra) => obra.getDataValue('categoria'));
        res.json(categorias);
    }
    catch (error) {
        // Maneja errores apropiadamente
        res.status(500).json({ error: 'Ha ocurrido un error al obtener las categorías.' });
    }
});
exports.obtenerCategorias = obtenerCategorias;
//OBTENER LAS DISTINTAS CATEGORIAS Y DIRECCIONES:
const obtenerCategoriasYDirecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoriasDirecciones = yield obra_1.Obra.findAll({
            attributes: [
                [connection_1.default.fn('DISTINCT', connection_1.default.col('categoria')), 'categoria'],
                [connection_1.default.fn('GROUP_CONCAT', connection_1.default.col('direccion')), 'direcciones']
            ],
            group: ['categoria']
        });
        // Mapea los valores de la respuesta de la base de datos
        const categoriasConDireccion = categoriasDirecciones.map((obra) => ({
            categoria: obra.getDataValue('categoria'),
            direcciones: obra.getDataValue('direcciones').split(',') // Separa las direcciones en un array
        }));
        res.json(categoriasConDireccion);
    }
    catch (error) {
        // Maneja errores apropiadamente
        res.status(500).json({ error: 'Ha ocurrido un error al obtener las categorías.' });
    }
});
exports.obtenerCategoriasYDirecciones = obtenerCategoriasYDirecciones;
const obtenerObrasRecientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listObras = yield obra_1.Obra.findAll({
        where: {
            reciente: "true" // Agrega la condición para seleccionar solo obras recientes
        },
    });
    res.json(listObras);
});
exports.obtenerObrasRecientes = obtenerObrasRecientes;
const obtenerRetratos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listRetratos = yield obra_1.Obra.findAll({
        where: {
            categoria: "Retratos"
        },
    });
    res.json(listRetratos);
});
exports.obtenerRetratos = obtenerRetratos;
const obtenerCarteles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listRetratos = yield obra_1.Obra.findAll({
        where: {
            categoria: "Carteles"
        },
    });
    res.json(listRetratos);
});
exports.obtenerCarteles = obtenerCarteles;
//RECIBIR OBRAS PARA LA GALERÍA SEGÚN LA CATEGORÍA SELECCIONADA
const obtenerObrasGaleria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = req.params.categoria;
    const listObrasGaleria = yield obra_1.Obra.findAll({
        where: {
            categoria: categoria
        },
    });
    res.json(listObrasGaleria);
});
exports.obtenerObrasGaleria = obtenerObrasGaleria;
