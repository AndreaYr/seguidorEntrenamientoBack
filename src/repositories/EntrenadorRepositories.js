import { Sequelize } from "sequelize";
import Entrenador from "../models/Entrenador.js";


class EntrenadorRepository {
 
    async createEntrenador(data) {
        return await Entrenador.create(data);
    }
    async getEntrenadores(query) {
        const where = {};
        if (query.nombre) {
            where.nombre = query.nombre;
        }
        return await Entrenador.findAll({ where });
    }
    async getEntrenadorById(id) {
        return await Entrenador.findByPk(id);
    }
    async updateEntrenador(id, data) {
        const entrenador = await Entrenador.findByPk(id);
        if (!entrenador) {
            return null;
        }
        return await entrenador.update(data);
    }
    async deleteEntrenador(id) {
        const entrenador = await Entrenador.findByPk(id);
        if (!entrenador) {
            return null;
        }
        await entrenador.destroy();
        return entrenador;
    }
    async bulkCreateEntrenador(data) {
        return await Entrenador.bulkCreate(data);
    }
}
export default new EntrenadorRepository();