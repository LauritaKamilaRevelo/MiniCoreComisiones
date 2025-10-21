import { Router } from "express";
import { getReglas, createRegla } from "../controllers/reglaController";

const router = Router();

router.get("/", getReglas);

router.post("/", createRegla);

export default router;
