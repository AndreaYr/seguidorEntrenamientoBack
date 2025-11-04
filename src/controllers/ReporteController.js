import ReporteServices from "../services/ReporteServices.js";

class ReporteController {
    async createReporte(req, res) {
        try {
            const reporte = await ReporteServices.createReporte(req.body);
            res.status(201).json(reporte);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllReportes(req, res) {
        try{
            const reportes = await ReporteServices.getAllReportes();
            res.status(200).json(reportes);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    async getReporteById(req, res) {
        try {
            const reporte = await ReporteServices.getReporteById(req.params.id);
            res.json(reporte);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateReporte(req, res) {
        try {
            const reporte = await ReporteServices.updateReporte(req.params.id, req.body);
            res.json(reporte);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteReporte(req, res) {
        try {
            await ReporteServices.deleteReporte(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new ReporteController();