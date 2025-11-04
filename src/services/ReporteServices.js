import ReporteRepositories from "../repositories/ReporteRepositories.js";

class ReporteServices {

    async createReporte(data) {
        try{
            return await ReporteRepositories.createReporte(data);
        }catch(error){
            throw new Error("Error creando reporte: " + error.message);
        }
    }

    async getAllReportes() {
        try{
            return await ReporteRepositories.getAllReportes();
        }catch(error){
            throw new Error("Error obteniendo reportes: " + error.message);
        }
    }

    async getReporteById(id) {
        try{
            const reporte = await ReporteRepositories.getReporteById(id);
            if(!reporte){
                throw new Error("Reporte no encontrado");
            }
            return reporte;
        }catch(error){
            throw new Error("Error obteniendo reporte por ID: " + error.message);
        }
    }

    async updateReporte(id, data) {
        try{
            const reporte = await ReporteRepositories.updateReporte(id, data);
            if(!reporte){
                throw new Error("Reporte no encontrado para actualizar");
            }
            return reporte;
        }catch(error){
            throw new Error("Error actualizando reporte: " + error.message);
        }
    }

    async deleteReporte(id) {
        try{
            const reporte = await ReporteRepositories.deleteReporte(id);
            if(!reporte){
                throw new Error("Reporte no encontrado para eliminar");
            }   
            return true;
        }catch(error){
            throw new Error("Error eliminando reporte: " + error.message);
        }
    }
}

export default new ReporteServices();