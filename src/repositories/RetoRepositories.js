import Reto from '../models/Reto.js';
import Deportista from '../models/Deportista.js';
import DeportistaReto from '../models/DeportistaReto.js';
import Usuario from '../models/Usuario.js';

class RetoRepositories {

    async createReto(data) {
        try{
            return await Reto.create(data);
        }catch(error){
            throw new Error('Error creating Reto: ' + error.message);
        }
    }

    async getAllRetos() {
        try{
            return await Reto.findAll({
                include: [{
                    model: DeportistaReto,
                    required: false,
                    include: [{
                        model: Deportista,
                        required: false,
                        attributes: ['id_deportista', 'id_usuario'],
                        include: [{
                            model: Usuario,
                            attributes: ['primerNombre', 'primerApellido', 'id_usuario']
                        }]
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
                    model: DeportistaReto,
                    include: [Deportista]
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
            const reto = await Reto.destroy({
                where: { id_reto: id }
            });
            return reto;
          
        }catch(error){
            throw new Error('Error deleting Reto: ' + error.message);
        }
    }
}

export default new RetoRepositories();