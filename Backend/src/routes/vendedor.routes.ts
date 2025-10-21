import { Router } from "express";
import { getVendedores, createVendedor } from "../controllers/vendedorController";

const router = Router();

router.get("/", getVendedores);
router.post("/", createVendedor);

export default router;
