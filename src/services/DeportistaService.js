// services/DeportistaServices.js
import DeportistaRepository from "../repositories/DeportistaRepository.js";
import Usuario from "../models/Usuario.js";

class DeportistaServices {

    async getDeportistas() {
        return await DeportistaRepository.findAll();
    }

    async getDeportistaById(id) {
        const deportista = await DeportistaRepository.findById(id);
        if (!deportista) {
            throw new Error('Deportista no encontrado');
        }
        return deportista;
    }

    async createDeportista(data) {
        // Verificar que el usuario existe
        const usuario = await Usuario.findByPk(data.id_usuario);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar que el usuario tenga rol de deportista
        if (usuario.rol !== 'deportista') {
            throw new Error('El usuario no tiene rol de deportista');
        }

        return await DeportistaRepository.create(data);
    }

    async updateDeportista(id, data) {
        const updated = await DeportistaRepository.update(id, data);
        if (!updated) {
            throw new Error('Deportista no encontrado');
        }
        return updated;
    }

    async deleteDeportista(id) {
        const deleted = await DeportistaRepository.delete(id);
        if (!deleted) {
            throw new Error('Deportista no encontrado');
        }
        return { message: 'Deportista eliminado exitosamente' };
    }

    async bulkCreate(data) {
        return await DeportistaRepository.bulkCreate(data);
            
    }
}

export default new DeportistaServices();