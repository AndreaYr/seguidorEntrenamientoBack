import { where } from "sequelize";
import Entrenamiento from "../models/Entrenamiento.js";

class EntrenamientoRepository {

    async create(data){
        return await Entrenamiento.create(data);
    }

    async findAll(filter = {}) {
        return await Usuario.findAll({where: filter});  
    }

    async findById(id){
        return await Entrenamiento.findByPk(id);
    }

    async update(id, data){
        const entrenamiento = await Entrenamiento.findByPk(id);
        if(!entrenamiento){
            return null;
        } 
        await entrenamiento.update(data);
        return entrenamiento;
    }

    async delete(id){
        const entrenamiento = await Entrenamiento.findByPk(id);
        if(!entrenamiento){
            return null;
        }
        await entrenamiento.destroy();
        return entrenamiento;
    }
}

export default new EntrenamientoRepository();