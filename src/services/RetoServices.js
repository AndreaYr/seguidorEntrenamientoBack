import RetoRepositories from "../repositories/RetoRepositories.js";

class RetoServices {

    async createReto(data) {
        try{
            return await RetoRepositories.createReto(data);
        }catch(error){
            throw new Error("Error creando reto: " + error.message);
        }
    }

    async addParticipante(data) {
        try {
            // Validar que el reto existe
            const reto = await RetoRepositories.getRetoById(data.id_reto);
            if (!reto) {
                throw new Error("Reto no encontrado");
            }
            
            // Validar que no esté ya inscrito
            const existing = await this.getParticipantesByReto(data.id_reto);
            const alreadyRegistered = existing.some(p => p.id_deportista === data.id_deportista);
            
            if (alreadyRegistered) {
                throw new Error("El deportista ya está inscrito en este reto");
            }

            return await RetoRepositories.addParticipante(data);
        } catch (error) {
            throw new Error("Error agregando participante: " + error.message);
        }
    }

    async getParticipantesByReto(id_reto) {
        try {
            return await RetoRepositories.getParticipantesByReto(id_reto);
        } catch (error) {
            throw new Error("Error obteniendo participantes: " + error.message);
        }
    }
    async getAllRetos() {
        try{
            return await RetoRepositories.getAllRetos();
        }catch(error){
            throw new Error("Error obteniendo retos: " + error.message);
        }
    }

    async getRetoById(id) {
        try{
            const reto = await RetoRepositories.getRetoById(id);
            if(!reto){
                throw new Error("reto no encontrado");
            }
            return reto;
        }catch(error){
            throw new Error("Error obteniendo reto por ID: " + error.message);
        }
    }

    async updateReto(id, data) {
        try{
            const reto = await RetoRepositories.updateReto(id, data);
            if(!reto){
                throw new Error("Reto no encontrado para actualizar");
            }
            return reto;
        }catch(error){
            throw new Error("Error actualizando reto: " + error.message);
        }
    }

    async deleteReto(id) {
        try{
            const reto = await RetoRepositories.deleteReto(id);
            if(!reto){
                throw new Error("Reto no encontrado para eliminar");
            }   
            return true;
        }catch(error){
            throw new Error("Error eliminando reto: " + error.message);
        }
    }
}

export default new RetoServices();