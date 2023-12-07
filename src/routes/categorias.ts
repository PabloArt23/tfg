import { Router } from "express";
import { getCategorias } from "../controllers/categorias";
import validateToken from "./validate-tokens";


const router = Router();

router.get('/', validateToken, getCategorias)
export default router;