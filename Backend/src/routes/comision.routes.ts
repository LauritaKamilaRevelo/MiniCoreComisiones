import { Router } from "express";
import { calcularComisiones } from "../controllers/comisionController";

const router = Router();
router.get("/", calcularComisiones);
export default router;
