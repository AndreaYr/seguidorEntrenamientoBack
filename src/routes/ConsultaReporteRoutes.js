// routes/consulta-reporteRoutes.js
import express from 'express';
import ConsultaReporteController from '../controllers/ConsultaReporteController.js';

const router = express.Router();

// ==================== REPORTES SIMPLES ====================
router.get('/deportistasPorEntrenador', ConsultaReporteController.getDeportistasPorEntrenador);
router.get('/entrenamientosRecientes', ConsultaReporteController.getEntrenamientosRecientes);
router.get('/retosActivos', ConsultaReporteController.getRetosActivos);

// ==================== REPORTES INTERMEDIOS ====================
router.get('/progresoMensual', ConsultaReporteController.getProgresoMensual);
router.get('/estadisticasDisciplina', ConsultaReporteController.getEstadisticasDisciplina);
router.get('/rankingDeportistas', ConsultaReporteController.getRankingDeportistas);
router.get('/participacionRetos', ConsultaReporteController.getParticipacionRetos);

// ==================== REPORTES COMPLEJOS ====================
router.get('/evolucionRendimiento', ConsultaReporteController.getEvolucionRendimiento);
router.get('/consistenciaEntrenamiento', ConsultaReporteController.getConsistenciaEntrenamiento);
router.get('/metricasGenerales', ConsultaReporteController.getMetricasGenerales);


export default router;