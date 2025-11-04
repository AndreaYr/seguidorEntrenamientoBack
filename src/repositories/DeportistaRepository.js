import Deportista from "../models/Deportista.js";

class DeportistaRepository {
    async findAll() {
        return await Deportista.findAll();
    }

    async findById(id) {
        return await Deportista.findByPk(id);
    }

    async create(data){
        return await Deportista.create(data);
    }

    async update(id, data){
        return await Deportista.update(data, {
            where:{
                id_deportista: id
            }
        });
    }
    
    async delete(id){
        return await Deportista.destroy({
            where:{
                id_deportista: id
            }
        });
    }
}
export default new DeportistaRepository();