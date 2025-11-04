import RetoRepositories from "../repositories/RetoRepositories.js";

class RetoServices {

    async createReto(data) {
        try{
            return await RetoRepositories.createReto(data);
        }catch(error){
            throw new Error("Error creando el reto: " + error.message);
        }
    }

    async getAllRetos() {
        try{
            return await RetoRepositories.getAllRetos();
        }catch(error){
            throw new Error("Error obteniendo los retos: " + error.message);
        }
    }

    async getRetoById(id) {
        try{
            const reto = await RetoRepositories.getRetoById(id);
            if (!reto) {
                throw new Error("Reto no encontrado");
            }
            return reto;
        }catch(error){
            throw new Error("Error obteniendo el reto: " + error.message);
        }
    }

    async updateReto(id, data) {
        try{
            const updatedReto = await RetoRepositories.updateReto(id, data);
            if (!updatedReto) {
                throw new Error("Reto no encontrado para actualizar");
            }
            return updatedReto;
        }catch(error){
            throw new Error("Error actualizando el reto: " + error.message);
        }
    }

    async deleteReto(id){
        try{
            const reto = await RetoRepositories.deleteReto(id);
            if(!reto){
                throw new Error("Reto no encontrado");
            }
            return true;
        }catch(error){
            throw new Error("Error en el servicio al eliminar reto: " + error.message);
        }
    }
}

export default new RetoServices(RetoRepositories);