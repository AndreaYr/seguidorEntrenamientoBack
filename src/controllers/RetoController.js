import RetoServices from "../services/RetoServices.js";

class RetoController{
    async createReto(req, res){
        try{
            const reto = await RetoServices.createReto(req.body)
            res.status(201).json(reto);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    };

    async getAllRetos(req, res){
        try{
            const retos = await RetoServices.getAllRetos();
            res.json(retos);
        }catch(error){
            res.status(500).json({message: error.message})
        }
    };

    async getRetoById(req,res){
        try{
            const reto = await RetoServices.getRetoById(req.params.id);
            res.json(reto);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    };

    async updateReto(req, res){
        try{
            const reto = await RetoServices.updateReto(req.params.id, req.body);
            res.json(reto);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    };

    async deleteReto(req, res){
        try{
            await RetoServices.deleteReto(req.params.id);
            res.status(204).send();
        }catch(error){
            res.status(404).json({message: error.message});
        }
    }
}

export default new RetoController();