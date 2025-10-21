import { Router } from "express";
import { getVentas, createVenta } from "../controllers/ventaController";

const router = Router();

router.get("/", getVentas);
router.post("/", createVenta);

export default router;
