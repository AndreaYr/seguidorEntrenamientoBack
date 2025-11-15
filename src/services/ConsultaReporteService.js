// services/ConsultaReporteService.js - VERSIÓN FINAL CORREGIDA
import { sequelize } from "../database.js";

class ConsultaReporteService {
    
    // 1. REPORTE: Deportistas por entrenador - NO MOVER (YA FUNCIONA)
    async getDeportistasPorEntrenador() {
        const query = `
            SELECT 
                u_entrenador."primerNombre" as "nombre_entrenador", 
                u_entrenador."primerApellido" as "apellido_entrenador",
                u_deportista."primerNombre" as "nombre_deportista",
                u_deportista."primerApellido" as "apellido_deportista",
                u_deportista.correo as "correo_deportista",
                d.peso,
                d.altura
            FROM deportistas d 
            JOIN entrenadores e ON d."id_entrenador" = e."id_entrenador" 
            JOIN usuarios u_entrenador ON e."id_usuario" = u_entrenador."id_usuario"
            JOIN usuarios u_deportista ON d."id_usuario" = u_deportista."id_usuario"
            ORDER BY u_entrenador."primerNombre", u_deportista."primerNombre"
        `;
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    }

    // 2. REPORTE: Entrenamientos recientes (SOLO COLUMNAS BÁSICAS)
    async getEntrenamientosRecientes() {
        const query = `
            SELECT 
                u."primerNombre" as "nombre_deportista",
                u."primerApellido" as "apellido_deportista",
                e.fecha, 
                e.duracion, 
                e.distancia
            FROM entrenamientos e 
            JOIN deportistas d ON e."id_deportista" = d."id_deportista" 
            JOIN usuarios u ON d."id_usuario" = u."id_usuario"
            ORDER BY e.fecha DESC 
            LIMIT 20
        `;
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    }

    // 3. REPORTE: Retos activos - NO MOVER (YA FUNCIONA)
    async getRetosActivos() {
        const query = `
            SELECT 
                r."id_reto",
                r.nombre, 
                r.descripcion,
                r."duracionDias" as "duracion_dias",
                r.estado,
                COUNT(dr."id_deportista") as "total_participantes" 
            FROM retos r 
            LEFT JOIN "deportista_reto" dr ON r."id_reto" = dr."id_reto" 
            WHERE r.estado = 'activo' 
            GROUP BY r."id_reto", r.nombre, r.descripcion, r."duracionDias", r.estado
            ORDER BY "total_participantes" DESC
        `;
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    }

    // 4. REPORTE: Progreso mensual (SOLO COLUMNAS BÁSICAS)
    async getProgresoMensual() {
        const query = `
            SELECT 
                d."id_deportista",
                u."primerNombre" as nombre,
                u."primerApellido" as apellido,
                TO_CHAR(e.fecha, 'YYYY-MM') as mes,
                SUM(e.distancia) as "distancia_total",
                SUM(e.duracion) as "tiempo_total_minutos",
                COUNT(e."id_entrenamiento") as "total_entrenamientos"
            FROM entrenamientos e 
            JOIN deportistas d ON e."id_deportista" = d."id_deportista" 
            JOIN usuarios u ON d."id_usuario" = u."id_usuario"
            GROUP BY d."id_deportista", u."primerNombre", u."primerApellido", mes 
            ORDER BY u."primerNombre", mes
        `;
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    }

    // 5. REPORTE: Estadísticas básicas (SIN tipo_disciplina)
    async getEstadisticasDisciplina() {
        const query = `
            SELECT 
                COUNT(*) as "total_entrenamientos",
                AVG(distancia) as "distancia_promedio",
                AVG(duracion) as "duracion_promedio_minutos",
                COUNT(DISTINCT "id_deportista") as "deportistas_activos"
            FROM entrenamientos 
            WHERE distancia IS NOT NULL
        `;
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    }

    // 6. REPORTE: Ranking de deportistas (SOLO COLUMNAS BÁSICAS)
    async getRankingDeportistas() {
        const query = `
            SELECT 
                d."id_deportista",
                u."primerNombre" as nombre,
                u."primerApellido" as apellido,
                u.correo,
                COUNT(e."id_entrenamiento") as "total_entrenamientos",
                SUM(e.distancia) as "distancia_total",
                SUM(e.duracion) as "tiempo_total_minutos"
            FROM deportistas d 
            JOIN usuarios u ON d."id_usuario" = u."id_usuario"
            LEFT JOIN entrenamientos e ON d."id_deportista" = e."id_deportista" 
            GROUP BY d."id_deportista", u."primerNombre", u."primerApellido", u.correo
            ORDER BY "distancia_total" DESC NULLS LAST
            LIMIT 15
        `;
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    }

    // 7. REPORTE: Participación en retos
    async getParticipacionRetos() {
        const query = `
            SELECT 
                d."id_deportista",
                u."primerNombre" as nombre,
                u."primerApellido" as apellido,
                COUNT(DISTINCT dr."id_reto") as "total_retos_participados",
                COUNT(DISTINCT CASE WHEN r.estado = 'finalizado' THEN r."id_reto" END) as "retos_completados",
                COUNT(DISTINCT CASE WHEN r.estado = 'activo' THEN r."id_reto" END) as "retos_activos"
            FROM deportistas d 
            JOIN usuarios u ON d."id_usuario" = u."id_usuario"
            LEFT JOIN "deportista_reto" dr ON d."id_deportista" = dr."id_deportista" 
            LEFT JOIN retos r ON dr."id_reto" = r."id_reto" 
            GROUP BY d."id_deportista", u."primerNombre", u."primerApellido"
            ORDER BY "total_retos_participados" DESC
        `;
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    }

    // 8. REPORTE: Evolución del rendimiento (SOLO COLUMNAS BÁSICAS)
    async getEvolucionRendimiento() {
        const query = `
            SELECT 
                d."id_deportista",
                u."primerNombre" as nombre,
                u."primerApellido" as apellido,
                EXTRACT(YEAR FROM e.fecha) as año,
                EXTRACT(MONTH FROM e.fecha) as mes,
                TO_CHAR(e.fecha, 'YYYY-MM') as "mes_formateado",
                COUNT(e."id_entrenamiento") as "entrenamientos_mes",
                AVG(e.distancia) as "distancia_promedio",
                SUM(e.distancia) as "distancia_total_mes"
            FROM entrenamientos e 
            JOIN deportistas d ON e."id_deportista" = d."id_deportista" 
            JOIN usuarios u ON d."id_usuario" = u."id_usuario"
            GROUP BY d."id_deportista", u."primerNombre", u."primerApellido", año, mes, "mes_formateado"
            HAVING COUNT(e."id_entrenamiento") > 0
            ORDER BY u."primerNombre", año, mes
        `;
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    }

    // 9. REPORTE: Consistencia en entrenamientos
    async getConsistenciaEntrenamiento() {
        const query = `
            SELECT 
                d."id_deportista",
                u."primerNombre" as nombre,
                u."primerApellido" as apellido,
                COUNT(e."id_entrenamiento") as "total_entrenamientos",
                COUNT(DISTINCT e.fecha) as "dias_entrenados",
                MIN(e.fecha) as "primera_fecha",
                MAX(e.fecha) as "ultima_fecha"
            FROM deportistas d 
            JOIN usuarios u ON d."id_usuario" = u."id_usuario"
            LEFT JOIN entrenamientos e ON d."id_deportista" = e."id_deportista" 
            GROUP BY d."id_deportista", u."primerNombre", u."primerApellido"
            ORDER BY "total_entrenamientos" DESC
        `;
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    }

    // 10. REPORTE: Métricas generales
    async getMetricasGenerales() {
        const query = `
            SELECT 
                -- Usuarios
                (SELECT COUNT(*) FROM usuarios) as "total_usuarios",
                (SELECT COUNT(*) FROM deportistas) as "total_deportistas",
                (SELECT COUNT(*) FROM entrenadores) as "total_entrenadores",
                
                -- Entrenamientos
                (SELECT COUNT(*) FROM entrenamientos) as "total_entrenamientos",
                (SELECT COUNT(DISTINCT "id_deportista") FROM entrenamientos) as "deportistas_activos",
                (SELECT AVG(distancia) FROM entrenamientos WHERE distancia IS NOT NULL) as "distancia_promedio",
                
                -- Retos
                (SELECT COUNT(*) FROM retos) as "total_retos",
                (SELECT COUNT(*) FROM retos WHERE estado = 'activo') as "retos_activos",
                (SELECT COUNT(*) FROM retos WHERE estado = 'finalizado') as "retos_finalizados"
        `;
        return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    }

}

export default new ConsultaReporteService();