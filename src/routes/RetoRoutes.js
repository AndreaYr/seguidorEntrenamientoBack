import RetoController from "../controllers/RetoController.js";
import { Router } from "express";

const router = Router();

router.post('/', RetoController.createReto);
router.post('/participantes', RetoController.addParticipante);
router.get('/:id_reto/participantes', RetoController.getParticipantesByReto);
router.get('/', RetoController.getAllRetos);
router.get('/:id', RetoController.getRetoById);
router.put('/:id', RetoController.updateReto);
router.delete('/:id', RetoController.deleteReto);
router.post("/bulkRetos", RetoController.bulkCreateRetos);


export default router;