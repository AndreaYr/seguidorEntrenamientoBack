import EntrenamientoRepository from "../repositories/EntrenamientoRepositories.js";

class EntrenamientoServices {
    constructor() {
        this.entrenamientoRepository = new EntrenamientoRepository;
    }

    async createEntrenamiento(data) {
        return await this.entrenamientoRepository.create(data);
    }

    async getAllEntrenamientos(filter = {}) {
        try {
            return await this.entrenamientoRepository.findAll(filter);
        } catch (error) {
            console.error('Error en EntrenamientoServices.getAllEntrenamientos:', error);
            throw new Error('Error al obtener los entrenamientos: ' + error.message);
        }
    }

    async getEntrenamientoById(id) {
        try {
            const entrenamiento = await this.entrenamientoRepository.findById(id);
            
            if (!entrenamiento) {
                throw new Error('Entrenamiento no encontrado');
            }
            
            return entrenamiento;
        } catch (error) {
            console.error('Error en EntrenamientoServices.getEntrenamientoById:', error);
            
            if (error.message.includes('no encontrado')) {
                throw error; // Re-lanzar error específico
            }
            
            throw new Error('Error al obtener el entrenamiento: ' + error.message);
        }
    }

    async updateEntrenamiento(id, data) {
        return await this.entrenamientoRepository.update(id, data);
    }

    async deleteEntrenamiento(id) {
        return await this.entrenamientoRepository.delete(id);
    }
}

export default new EntrenamientoServices();