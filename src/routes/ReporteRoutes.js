import ReporteController from "../controllers/ReporteController.js";
import { Router } from "express";

const router = Router();

router.get("/", ReporteController.getAllReportes);
router.get("/:id", ReporteController.getReporteById);
router.post("/", ReporteController.createReporte);
router.put("/:id", ReporteController.updateReporte);
router.delete("/:id", ReporteController.deleteReporte);

export default router;