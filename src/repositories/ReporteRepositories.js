import Deportista from "../models/Deportista.js";
import Reporte from "../models/Reporte.js";

class ReporteRepositories {
    async createReporte(data) {
        try{
            const deportista = await Deportista.findByPk(data.id_deportista);
            if(!deportista){
                throw new Error("El deportista no existe");
            }

            return await Reporte.create(data);
        }catch(error){
             throw new Error("Error creando reporte: " + error.message);
        }
    }

    async getAllReportes() {
        return await Reporte.findAll();
    }

    async getReporteById(id) {
        return await Reporte.findByPk(id);
    }

    async updateReporte(id, data) {
        const reporte = await Reporte.findByPk(id);
        if(reporte) {
            return await reporte.update(data);
        }
        return null;
    }

    async deleteReporte(id) {
        const reporte = await Reporte.destroy({ 
            where: { id_reporte: id } 
        });
        return reporte > 0;
    }

}

export default new ReporteRepositories();