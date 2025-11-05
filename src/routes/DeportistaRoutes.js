import DeportistaController from "../controllers/DeportistaController.js";
import { Router } from "express";

const router = Router();

router.get("/", DeportistaController.getDeportistas);
router.get("/:id", DeportistaController.getDeportistaById);
router.post("/", DeportistaController.createDeportista);
router.put("/:id", DeportistaController.updateDeportista);
router.delete("/:id", DeportistaController.deleteDeportista);

export default router;