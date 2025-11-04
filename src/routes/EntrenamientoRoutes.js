import EntrenamientoController from "../controllers/EntrenamientoController.js";
import { Router } from "express";

const router = Router();

router.post("/", EntrenamientoController.createEntrenamiento);
router.get("/", EntrenamientoController.getAllEntrenamientos);
router.get("/:id", EntrenamientoController.getEntrenamientoById);
router.put("/:id", EntrenamientoController.updateEntrenamiento);
router.delete("/:id", EntrenamientoController.deleteEntrenamiento);

export default router;