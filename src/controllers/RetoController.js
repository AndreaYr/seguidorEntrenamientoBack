import RetoServices from "../services/RetoServices.js";

class RetoController{
    async createReto(req, res){
        try{
            const reto = await RetoServices.createReto(req.body)
            res.status(201).json(reto);
        }catch(error){
            console.error("❌ Error en createReto:", error);
            res.status(400).json({message: error.message});
        }
    };

    async addParticipante(req, res) {
        try {
            const participante = await RetoServices.addParticipante(req.body);
            res.status(201).json(participante);
        } catch (error) {
            console.error("❌ Error en addParticipante:", error);
            res.status(400).json({ message: error.message });
        }
    }

    async getParticipantesByReto(req, res) {
        try {
            const { id_reto } = req.params;
            const participantes = await RetoServices.getParticipantesByReto(id_reto);
            res.json(participantes);
        } catch (error) {
            console.error("❌ Error en getParticipantesByReto:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async getAllRetos(req, res){
        try{
            console.log("✅ Controlador: getAllRetos llamado");
            const retos = await RetoServices.getAllRetos();
            console.log("✅ Controlador: retos obtenidos:", retos?.length || 0);
            res.json(retos);
        }catch(error){
            console.error("❌ Error en getAllRetos:", error);
            res.status(500).json({message: error.message})
        }
    };

    async getRetoById(req,res){
        try{
            const reto = await RetoServices.getRetoById(req.params.id);
            res.json(reto);
        }catch(error){
            console.error("❌ Error en getRetoById:", error);
            res.status(400).json({message: error.message});
        }
    };

    async updateReto(req, res){
        try{
            const reto = await RetoServices.updateReto(req.params.id, req.body);
            res.json(reto);
        }catch(error){
            console.error("❌ Error en updateReto:", error);
            res.status(400).json({message: error.message});
        }
    };

    async deleteReto(req, res){
        try{
            await RetoServices.deleteReto(req.params.id);
            res.status(204).send();
        }catch(error){
            console.error("❌ Error en deleteReto:", error);
            res.status(404).json({message: error.message});
        }
    }

    async bulkCreateRetos(req, res) {
        try {
            const retos = await RetoServices.bulkCreate(req.body);
            res.status(201).json(retos);
        } catch (error) {
            console.error("❌ Error en bulkCreateRetos:", error);
            res.status(500).json({ error: error.message });
        }
    }
}

export default new RetoController();