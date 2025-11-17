import EntrenadorRepositories from "../repositories/EntrenadorRepositories.js";

class EntrenadorService {


    async createEntrenador(data) {
        return await EntrenadorRepositories.createEntrenador(data);
    }
    async getEntrenadores(query) {
        return await EntrenadorRepositories.getEntrenadores(query);
    }
    async getEntrenadorById(id) {
        const entrenador = await EntrenadorRepositories.getEntrenadorById(id);
        if (!entrenador) {
            throw new Error('Entrenador no encontrado');
        }
        return entrenador;
    }   
    async updateEntrenador(id, data) {
        const updated = await EntrenadorRepositories.updateEntrenador(id, data);
        if (!updated) {
            throw new Error('Entrenador no encontrado');
        }
        return updated;
    }
    async deleteEntrenador(id) {
        const deleted = await EntrenadorRepositories.deleteEntrenador(id);
        if (!deleted) {
            throw new Error('Entrenador no encontrado');
        }
        return { message: 'Entrenador eliminado exitosamente' };
    }
    async bulkCreateEntrenador(data) {
        return await EntrenadorRepositories.bulkCreateEntrenador(data);
    }
}

export default new EntrenadorService();