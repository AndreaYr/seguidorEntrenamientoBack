import EntrenamientoRepository from "../repositories/EntrenamientoRepositories.js";
import Deportista from "../models/Deportista.js";
import Entrenador from "../models/Entrenador.js";

class EntrenamientoServices {
    async createEntrenamiento(data) {
        //Verificar que el deportista
        const deportista = await Deportista.findByPk(data.id_deportista);
        if (!deportista) {
            throw new Error("Deportista no encontrado");
        }

        //Verificar que el entrenador
        const entrenador = await Entrenador.findByPk(data.id_entrenador);
        if (!entrenador) {
            throw new Error("Entrenador no encontrado");
        }

        //Validar disciplina (deporte)
        const disciplinasValidas = ["running", "natacion", "ciclismo"];
        if(!disciplinasValidas.includes(data.disciplina.toLowerCase())){
            throw new Error("Disciplina no válida");
        }
        return await EntrenamientoRepository.create(data);
    }

    async getAllEntrenamientos(filter = {}) {
        //Filtro por id_deportista, disciplina o fecha
        if(query.id_deportista){
            filter.id_deportista = query.id_deportista;
        }
        if(query.disciplina){
            filter.disciplina = query.disciplina;
        }
        if(query.fecha){
            filter.fecha = query.fecha;
        }
        return await EntrenamientoRepository.findAll(filter);
    }
    
    async getEntrenamientoById(id) {
        const entrenamiento = await EntrenamientoRepository.findById(id);
        if (!entrenamiento) {
            throw new Error("Entrenamiento no encontrado");
        }
        return entrenamiento;
    }

    async updateEntrenamiento(id, data) {
        //Validar existencia si se actualiza id_deportista
        if(data.id_deportista){
            const deportista = await Deportista.findByPk(data.id_deportista);
            if (!deportista) {
                throw new Error("Deportista no encontrado");
            }
        }

        if(data.id_entrenador){
            const entrenador = await Entrenador.findByPk(data.id_entrenador);
            if (!entrenador) {
                throw new Error("Entrenador no encontrado");
            }
        }

        const updated = await EntrenamientoRepository.update(id, data);
        if (!updated) {
            throw new Error("Entrenamiento no encontrado");
        }
        return updated;
    }

    async deleteEntrenamiento(id) {
        const deleted = await EntrenamientoRepository.delete(id);
        if (!deleted) {
            throw new Error("Entrenamiento no encontrado");
        }
        return deleted;
    }
}  

export default new EntrenamientoServices();


