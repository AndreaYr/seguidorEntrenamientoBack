import EntrenadorController from "../controllers/EntrenadorController.js";
import { Router } from "express";

const router = Router();

router.get("/", EntrenadorController.getEntrenadores);
router.get("/:id", EntrenadorController.getEntrenadorById);
router.post("/", EntrenadorController.createEntrenador);
router.put("/:id", EntrenadorController.updateEntrenador);
router.delete("/:id", EntrenadorController.deleteEntrenador);
router.post("/bulkEntrenador", EntrenadorController.bulkCreateEntrenador);

export default router;