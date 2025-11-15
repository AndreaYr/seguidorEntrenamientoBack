// controllers/ConsultaReporteController.js
import ConsultaReporteService from "../services/ConsultaReporteService.js";

class ConsultaReporteController {
    
    // ==================== REPORTES SIMPLES ====================
    
    async getDeportistasPorEntrenador(req, res) {
        try {
            const data = await ConsultaReporteService.getDeportistasPorEntrenador();
            res.json({ 
                success: true, 
                message: 'Deportistas agrupados por entrenador',
                total: data.length,
                data 
            });
        } catch (error) {
            console.error('❌ Error en getDeportistasPorEntrenador:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getEntrenamientosRecientes(req, res) {
        try {
            const data = await ConsultaReporteService.getEntrenamientosRecientes();
            res.json({ 
                success: true, 
                message: 'Entrenamientos más recientes',
                total: data.length,
                data 
            });
        } catch (error) {
            console.error('❌ Error en getEntrenamientosRecientes:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getRetosActivos(req, res) {
        try {
            const data = await ConsultaReporteService.getRetosActivos();
            res.json({ 
                success: true, 
                message: 'Retos activos con número de participantes',
                total: data.length,
                data 
            });
        } catch (error) {
            console.error('❌ Error en getRetosActivos:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // ==================== REPORTES INTERMEDIOS ====================
    
    async getProgresoMensual(req, res) {
        try {
            const data = await ConsultaReporteService.getProgresoMensual();
            res.json({ 
                success: true, 
                message: 'Progreso mensual de todos los deportistas',
                total: data.length,
                data 
            });
        } catch (error) {
            console.error('❌ Error en getProgresoMensual:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getEstadisticasDisciplina(req, res) {
        try {
            const data = await ConsultaReporteService.getEstadisticasDisciplina();
            res.json({ 
                success: true, 
                message: 'Estadísticas por tipo de disciplina',
                total: data.length,
                data 
            });
        } catch (error) {
            console.error('❌ Error en getEstadisticasDisciplina:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getRankingDeportistas(req, res) {
        try {
            const data = await ConsultaReporteService.getRankingDeportistas();
            res.json({ 
                success: true, 
                message: 'Ranking de deportistas por rendimiento',
                total: data.length,
                data 
            });
        } catch (error) {
            console.error('❌ Error en getRankingDeportistas:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getParticipacionRetos(req, res) {
        try {
            const data = await ConsultaReporteService.getParticipacionRetos();
            res.json({ 
                success: true, 
                message: 'Participación de deportistas en retos',
                total: data.length,
                data 
            });
        } catch (error) {
            console.error('❌ Error en getParticipacionRetos:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // ==================== REPORTES COMPLEJOS ====================
    
    async getEvolucionRendimiento(req, res) {
        try {
            const data = await ConsultaReporteService.getEvolucionRendimiento();
            res.json({ 
                success: true, 
                message: 'Evolución del rendimiento mensual',
                total: data.length,
                data 
            });
        } catch (error) {
            console.error('❌ Error en getEvolucionRendimiento:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getConsistenciaEntrenamiento(req, res) {
        try {
            const data = await ConsultaReporteService.getConsistenciaEntrenamiento();
            res.json({ 
                success: true, 
                message: 'Consistencia en entrenamientos por deportista',
                total: data.length,
                data 
            });
        } catch (error) {
            console.error('❌ Error en getConsistenciaEntrenamiento:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    async getMetricasGenerales(req, res) {
        try {
            const data = await ConsultaReporteService.getMetricasGenerales();
            res.json({ 
                success: true, 
                message: 'Métricas generales del sistema',
                data: data[0] // Solo un registro con todas las métricas
            });
        } catch (error) {
            console.error('❌ Error en getMetricasGenerales:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

}

export default new ConsultaReporteController();