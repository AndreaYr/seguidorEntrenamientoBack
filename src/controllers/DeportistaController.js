import DeportistaService from "../services/DeportistaService.js";

class DeportistaController {
    async getDeportista(req, res) {
        try{
            const data = await DeportistaService.getDeportista();
            res.json(data); 
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    }

    async getDeportistaById(req, res) {
        try{
            const data = await DeportistaService.getDeportistaById(req.params.id);
            res.json(data);
        }catch(error){
            res.status(404).json({ message: error.message });
        }
    }

    async createDeportista(req, res){
        try{
            const data = await DeportistaService.createDeportista(req.body);   
            res.status(201).json(data);
        }catch(error){
            res.status(400).json({ message: error.message });
        }
    }

    async updateDeportista(req, res){
        try{
            const data = await DeportistaService.updateDeportista(req.params.id, req.body);
            res.json(data);
        }catch(error){
            res.status(400).json({ message: error.message });
        }
    }

    async deleteDeportista(req, res){
        try{
            await DeportistaService.deleteDeportista(req.params.id);
            res.json({ message: "Deportista eliminado correctamente" });
        }catch(error){
            res.status(400).json({ message: error.message });
        }
    }
}

export default new DeportistaController();