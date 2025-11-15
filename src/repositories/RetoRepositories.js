import Reto from '../models/Reto.js';
import Deportista from '../models/Deportista.js';
import Usuario from '../models/Usuario.js';
import DeportistaReto from '../models/DeportistaReto.js';

class RetoRepositories {

    async createReto(data) {
        try{
            return await Reto.create(data);
        }catch(error){
            throw new Error('Error creating Reto: ' + error.message);
        }
    }

    async addParticipante(data) {
        try {
            return await DeportistaReto.create(data);
        } catch (error) {
            throw new Error('Error adding participant: ' + error.message);
        }
    }

    async getParticipantesByReto(id_reto) {
        try {
            return await DeportistaReto.findAll({
                where: { id_reto },
                include: [{
                    model: Deportista,
                    as: 'Deportista',
                    include: [{
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['id_usuario', 'primerNombre', 'primerApellido']
                    }]
                }]
            });
        } catch (error) {
            throw new Error('Error fetching participants: ' + error.message);
        }
    }

    async getAllRetos() {
        try{
            return await Reto.findAll({
                include: [{
                    model: Deportista,
                    required: false,
                    as: 'Deportista', 
                    include: [{
                        model: Usuario,
                        required: false,
                        as: 'usuario', 
                        attributes: ['id_usuario', 'primerNombre', 'primerApellido'],
                    }]
                }],
                order: [['id_reto', 'ASC']]
            });
        }catch(error){
            throw new Error('Error fetching Retos: ' + error.message);
        }
    }

    async getRetoById(id) {
        try{
            return await Reto.findByPk(id, {
                include: [{
                    model: Deportista,
                    as: 'Deportista',
                    through: { 
                        attributes: ['id_deportista', 'id_reto', 'fecha_inscripcion']
                    },

                    attributes: ['id_deportista', 'id_usuario'],
                    include: [{
                        model: Usuario,
                        attributes: ['id_usuario', 'primerNombre', 'primerApellido'],
                        as: 'usuario' 
                    }]
                }]
            });
        }catch(error){
            throw new Error('Error fetching Reto by ID: ' + error.message);
        }
    }

    async updateReto(id, data) {
        try{
            const reto = await Reto.findByPk(id);
            if(!reto){
                throw new Error('Reto not found');
            }
            return await reto.update(data);
        }catch(error){
            throw new Error('Error updating Reto: ' + error.message);
        }
    }

    async deleteReto(id) {
        try{
            const rowsDeleted = await Reto.destroy({
                where: { id_reto: id }
            });
            return rowsDeleted > 0;
        }catch(error){
            throw new Error('Error deleting Reto: ' + error.message);
        }
    }

    async bulkCreate(retos) {
        return await Reto.bulkCreate(retos);
    }
}

export default new RetoRepositories();