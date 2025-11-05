// repositories/DeportistaRepository.js
import Deportista from "../models/Deportista.js";
import Usuario from "../models/Usuario.js";

class DeportistaRepository {

    async findAll() {
        return await Deportista.findAll({ 
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'correo']
            }]
        });  
    }

    async findById(id){
        return await Deportista.findByPk(id, {
            include: [{
                model: Usuario,
                as: 'usuario',
                attributes: ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'correo']
            }]
        });
    }

    async create(data){
        return await Deportista.create(data);
    }

    async update(id, data){
        const deportista = await Deportista.findByPk(id);
        if(!deportista){
            return null;
        } 
        await deportista.update(data);
        return deportista;
    }

    async delete(id){
        const result = await Deportista.destroy({
            where: { id_deportista: id }
        });
        return result > 0;
    }
}

export default new DeportistaRepository();