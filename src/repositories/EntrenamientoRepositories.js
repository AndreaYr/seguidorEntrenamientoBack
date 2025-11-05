import { sequelize } from "../database.js";
import Entrenamiento from "../models/Entrenamiento.js";

class EntrenamientoRepository {

    async create(data) {
        try {
            console.log('📝 Creando entrenamiento con datos:', data);
            
            // Validar y preparar datos
            const entrenamientoData = this.prepararDatos(data);
            
            // Crear el entrenamiento
            const entrenamiento = await Entrenamiento.create(entrenamientoData);
            
            console.log('✅ Entrenamiento creado exitosamente:', entrenamiento.toJSON());
            return entrenamiento;
            
        } catch (error) {
            console.error('❌ Error en create:', error);
            throw new Error(`Error al crear entrenamiento: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            console.log('🔄 Actualizando entrenamiento ID:', id, 'con datos:', data);
            
            // Validar y preparar datos
            const entrenamientoData = this.prepararDatos(data);
            
            const [affectedRows] = await Entrenamiento.update(entrenamientoData, {
                where: { id_entrenamiento: id }
            });
            
            if (affectedRows === 0) {
                throw new Error('Entrenamiento no encontrado');
            }
            
            // Obtener el entrenamiento actualizado
            const entrenamientoActualizado = await this.findById(id);
            console.log('✅ Entrenamiento actualizado:', entrenamientoActualizado);
            
            return entrenamientoActualizado;
            
        } catch (error) {
            console.error('❌ Error en update:', error);
            throw new Error(`Error al actualizar entrenamiento: ${error.message}`);
        }
    }

    // Método para preparar y validar datos según disciplina
    prepararDatos(data) {
        const disciplinasConDistancia = ['running', 'ciclismo', 'natacion', 'caminata'];
        const disciplinasConVelocidad = ['running', 'ciclismo', 'natacion'];
        
        const entrenamientoData = {
            disciplina: data.disciplina,
            fecha: data.fecha,
            duracion: data.duracion,
            id_deportista: data.id_deportista
        };
        
        // Solo incluir distancia si aplica para la disciplina
        if (disciplinasConDistancia.includes(data.disciplina) && data.distancia) {
            entrenamientoData.distancia = parseFloat(data.distancia);
        } else {
            entrenamientoData.distancia = null; // Asegurar que sea null si no aplica
        }
        
        // Solo incluir velocidad si aplica para la disciplina
        if (disciplinasConVelocidad.includes(data.disciplina) && data.velocidadPromedio) {
            entrenamientoData.velocidadPromedio = parseFloat(data.velocidadPromedio);
        } else {
            entrenamientoData.velocidadPromedio = null;
        }
        
        // Campos opcionales
        if (data.caloriasQuemadas) {
            entrenamientoData.caloriasQuemadas = parseInt(data.caloriasQuemadas);
        }
        
        if (data.frecuenciaCardiaca) {
            entrenamientoData.frecuenciaCardiaca = parseInt(data.frecuenciaCardiaca);
        }
        
        if (data.id_entrenador) {
            entrenamientoData.id_entrenador = parseInt(data.id_entrenador);
        }
        
        console.log('📋 Datos preparados para BD:', entrenamientoData);
        return entrenamientoData;
    }

    async findAll(filter = {}) {
        try {
            console.log('🔍 Buscando entrenamientos con filtro:', filter);
            
            const whereConditions = {};
            
            if (filter.id_deportista) {
                whereConditions.id_deportista = filter.id_deportista;
            }
            if (filter.disciplina) {
                whereConditions.disciplina = filter.disciplina;
            }
            if (filter.fecha) {
                whereConditions.fecha = filter.fecha;
            }
            
            // CONSULTA CON LOS NOMBRES CORRECTOS
            const query = `
                SELECT 
                    e.*,
                    u."primerNombre",
                    u."primerApellido"
                FROM entrenamientos e
                INNER JOIN deportistas d ON e.id_deportista = d.id_deportista
                INNER JOIN usuarios u ON d.id_usuario = u.id_usuario
                ${Object.keys(whereConditions).length > 0 ? 'WHERE ' + Object.keys(whereConditions).map(key => `e.${key} = :${key}`).join(' AND ') : ''}
                ORDER BY e.fecha DESC
            `;
            
            console.log('📋 Query:', query);
            
            const results = await sequelize.query(query, {
                replacements: whereConditions,
                type: sequelize.QueryTypes.SELECT
            });
            
            console.log('✅ Resultados con nombres:', results);
            return results;
            
        } catch (error) {
            console.error('❌ Error en findAll:', error);
            
            // Fallback a datos básicos
            const entrenamientos = await Entrenamiento.findAll({
                where: whereConditions,
                order: [['fecha', 'DESC']],
                raw: true
            });
            
            return entrenamientos;
        }
    }

    async findById(id) {
        try {
            // CONSULTA CON JOIN PARA INCLUIR DATOS DEL DEPORTISTA
            const query = `
                SELECT 
                    e.*,
                    u."primerNombre",
                    u."primerApellido",
                    u."segundoNombre",
                    u."segundoApellido"
                FROM entrenamientos e
                INNER JOIN deportistas d ON e.id_deportista = d.id_deportista
                INNER JOIN usuarios u ON d.id_usuario = u.id_usuario
                WHERE e.id_entrenamiento = :id
            `;
            
            console.log('🔍 Buscando entrenamiento por ID:', id);
            
            const results = await sequelize.query(query, {
                replacements: { id },
                type: sequelize.QueryTypes.SELECT
            });
            
            const entrenamiento = results[0] || null;
            console.log('✅ Entrenamiento encontrado:', entrenamiento);
            return entrenamiento;
            
        } catch (error) {
            console.error('❌ Error en findById:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            console.log('🗑️ Eliminando entrenamiento ID:', id);
            
            const result = await Entrenamiento.destroy({
                where: { id_entrenamiento: id }
            });
            
            if (result === 0) {
                throw new Error('Entrenamiento no encontrado');
            }
            
            console.log('✅ Entrenamiento eliminado exitosamente');
            return result;
            
        } catch (error) {
            console.error('❌ Error en delete:', error);
            throw new Error(`Error al eliminar entrenamiento: ${error.message}`);
        }
    }
}

export default EntrenamientoRepository;