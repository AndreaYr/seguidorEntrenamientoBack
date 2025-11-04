import RetoController from "../controllers/RetoController.js";
import { Router } from "express";

const router = Router();

router.post('/', RetoController.createReto);
router.get('/', RetoController.getAllRetos);
router.get('/:id', RetoController.getRetoById);
router.put('/:id', RetoController.updateReto);
router.delete('/:id', RetoController.deleteReto);

export default router;