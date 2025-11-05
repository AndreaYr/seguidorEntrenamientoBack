import DeportistaRepository from "../repositories/DeportistaRepository.js";

class DeportistaService {
    async getDeportista() {
        return await DeportistaRepository.findAll();
    }

    async getDeportistaById(id) {
        const deportista = await DeportistaRepository.findById(id);
        if(!deportista) {
            throw new Error("Deportista no encontrado");
        }
        return deportista;
    }

    async createDeportista(data) {
        return await DeportistaRepository.create(data);
    }

    async updateDeportista(id, data) {
        return await DeportistaRepository.update(id, data);
    }

    async deleteDeportista(id) {
        return await DeportistaRepository.delete(id);
    }

    async bulkCreate(data) {
        return await DeportistaRepository.bulkCreate(data);
            
    }
}
export default new DeportistaService();