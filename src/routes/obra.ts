import { Router } from "express";
import { getObras, newObra, getObraAEditar, actualizarObra, borrarObra, obtenerCategorias, obtenerObrasRecientes, obtenerRetratos, obtenerCarteles, obtenerObrasGaleria, obtenerCategoriasYDirecciones} from "../controllers/obra";
import validateToken from "./validate-tokens";


const router = Router();

router.get('/', validateToken, getObras)
router.get('/get:id', validateToken, getObraAEditar)
router.post('/', newObra)
router.post('/actualizar/:id', actualizarObra)
router.post('/borrar/:id', borrarObra)
router.get('/obtenerCategorias', obtenerCategorias)
router.get('/obtenerCatDir', obtenerCategoriasYDirecciones)
router.get('/obtenerRecientes', obtenerObrasRecientes)
router.get('/obtenerRetratos', obtenerRetratos)
router.get('/obtenerCarteles', obtenerCarteles)
router.get('/getcat:categoria', obtenerObrasGaleria)
export default router;